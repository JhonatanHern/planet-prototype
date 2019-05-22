#![feature(try_from)]
#[macro_use]
extern crate hdk;
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;
#[macro_use]
extern crate holochain_core_types_derive;

use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
    dna::entry_types::Sharing,
    error::HolochainError,
    json::JsonString,
    validation::EntryValidationData
};

// see https://developer.holochain.org/api/0.0.15-alpha1/hdk/ for info on using the hdk library

mod user;
mod message;
mod channel;
mod global_base;
mod utils;

define_zome! {
    entries: [
        global_base::definition(),
        user::definition(),
        channel::definition(),
        message::definition()
    ]
    genesis: || {
        Ok(())
    }
    functions: [
        send_message: {
            inputs: | entry: message::Message , destiny : Address|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: message::handle_send_message
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
        reee: {
            inputs: | s : String |,
            outputs: |result: ZomeApiResult<String>|,
            handler: ree
        }
    ]
    traits: {
        hc_public [
            send_message,
            create_channel,
            check_register,
            create_user,
            reee,
            get_all_users,
            get_all_channels
        ]
    }
}

fn ree(s:String) -> ZomeApiResult<String>{
    Ok(s)
}