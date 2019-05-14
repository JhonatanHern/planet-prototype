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


#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct Message {
    content: String,
}

pub fn handle_send_message( entry : Message , destiny : Address ) -> ZomeApiResult<Address> {
    let entry = Entry::App("message".into(), entry.into());
    let address = hdk::commit_entry(&entry)?;
    Ok(address)
}

pub fn handle_get_my_entry(address: Address) -> ZomeApiResult<Option<Entry>> {
    hdk::get_entry(&address)
}

fn definition() -> ValidatingEntryType {
    entry!(
        name: "message",
        description: "message entry",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Message>| {
            Ok(())
        }
    )
}

define_zome! {
    entries: [
       definition()
    ]
    genesis: || { Ok(()) }
    functions: [
        send_message: {
            inputs: |entry: Message, destiny : Address|,
            outputs: |result: ZomeApiResult<Address>|,
            handler: handle_send_message
        }
        // get_my_entry: {
        //     inputs: |address: Address|,
        //     outputs: |result: ZomeApiResult<Option<Entry>>|,
        //     handler: handle_get_my_entry
        // }
    ]

    traits: {
        hc_public [send_message]
    }
}
