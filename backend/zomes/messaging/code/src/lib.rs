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
mod discussion;
mod comment;
mod group;
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
        conversation::definition(),
        discussion::definition(),
        comment::definition(),
        group::definition()
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
        create_group: {
            inputs: | entry : group::Group |,
            outputs: |result: ZomeApiResult<Address>|,
            handler: group::handle_create_group
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
        get_all_groups:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<group::Group>> |,
            handler : group::handle_get_all_groups
        }
        get_my_channels:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<channel::Channel>> |,
            handler : channel::handle_get_my_channels
        }
        get_my_groups:{
            inputs: | |,
            outputs : | result : ZomeApiResult<utils::GetLinksLoadResult<group::Group>> |,
            handler : group::handle_get_my_groups
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
        create_discussion:{
            inputs: | entry : discussion::Discussion, group_addr: Address |,
            outputs:| result: ZomeApiResult<Address> |,
            handler: discussion::handle_create_discussion
        }
        create_comment:{
            inputs: | text : String, discussion_addr: Address |,
            outputs:| result: ZomeApiResult<Address> |,
            handler: comment::handle_create_comment
        }
        get_group_discussions:{
            inputs: | group_addr:Address |,
            outputs:| result: ZomeApiResult<utils::GetLinksLoadResult<discussion::Discussion>> |,
            handler: discussion::handle_get_group_discussions
        }
        get_my_discussions:{
            inputs: | |,
            outputs:| result: ZomeApiResult<utils::GetLinksLoadResult<discussion::Discussion>> |,
            handler: discussion::handle_get_my_discussions
        }
        get_discussion_comments:{
            inputs: | discussion_addr: Address |,
            outputs: | result: ZomeApiResult<utils::GetLinksLoadResult<comment::Comment>> |,
            handler: comment::handle_get_discussion_comments
        }
        get_my_comments:{
            inputs: | |,
            outputs: | result: ZomeApiResult<utils::GetLinksLoadResult<comment::Comment>> |,
            handler: comment::handle_get_my_comments
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

            create_discussion,
            get_group_discussions,
            get_my_discussions,

            create_comment,
            get_discussion_comments,
            get_my_comments,

            create_group,
            get_all_groups,
            get_my_groups,

            check_register,
            get_all_users,
            create_user,

            get_my_conversations,
            create_conversation
        ]
    }
}
