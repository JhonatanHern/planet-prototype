#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]


extern crate holochain_json_derive;

use hdk::{
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    agent::AgentId,
    validation::EntryValidationData
};

use hdk::holochain_persistence_api::{
    cas::content::Address,
};

use hdk::holochain_json_api::{
    error::JsonError,
    json::JsonString,
};

mod user;
mod message;
mod channel;
mod conversation;
mod global_base;
mod utils;

fn ree(s:String) -> ZomeApiResult<String>{
    Ok(s)
}

define_zome! {
    entries: [
        global_base::definition(),
        user::definition(),
        channel::definition(),
        message::definition(),
        conversation::definition()
    ]
    init: || {
        Ok(())
    }
    validate_agent: |validation_data : EntryValidationData::<AgentId>| {{
        if let EntryValidationData::Create{entry, ..} = validation_data {
            let agent = entry as AgentId;
            if agent.nick == "reject_agent::app" {
                Err("This agent will always be rejected".into())
            } else {
                Ok(())
            }
        } else {
            Err("Cannot update or delete an agent at this time".into())
        }
    }}
    functions: [
        send_message: {
            inputs: | entry: message::Message , channel_address : Address|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: message::handle_send_message
        }
        send_private_message: {
            inputs: | entry: message::Message , conversation_address : Address|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: message::handle_send_private_message
        }
        get_messages_from_channel:{
            inputs: | channel : Address |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<message::MessageWithSender>> |,
            handler : message::handle_get_messages_from_channel
        }
        create_channel: {
            inputs: | entry : channel::Channel |,
            outputs: |result: ZomeApiResult<Address>|,
            handler: channel::handle_create_channel
        }
        create_user: {
            inputs: | username : String |,
            outputs: |result: ZomeApiResult<Address>|,
            handler: user::handle_create_user
        }
        check_register: {
            inputs: | |,
            outputs: |result: ZomeApiResult<serde_json::Value>|,
            handler: user::handle_check_register
        }
        get_all_users:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<user::User>> |,
            handler : user::handle_get_all_users
        }
        get_all_channels:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<channel::Channel>> |,
            handler : channel::handle_get_all_channels
        }
        get_my_channels:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<channel::Channel>> |,
            handler : channel::handle_get_my_channels
        }
        get_my_conversations:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<conversation::Conversation>> |,
            handler : conversation::handle_get_my_conversations
        }
        create_conversation:{
            inputs: | buddy: Address |,
            outputs : | result : ZomeApiResult<Address> |,
            handler : conversation::handle_create_conversation
        }
        reee: {
            inputs: | s : String |,
            outputs: |result: ZomeApiResult<String>|,
            handler: ree
        }
    ]
    traits: {
        hc_public [
            reee,

            send_message,
            send_private_message,
            get_messages_from_channel,
            
            create_channel,
            get_all_channels,
            get_my_channels,

            check_register,
            get_all_users,
            create_user,

            get_my_conversations,
            create_conversation
        ]
    }
}
