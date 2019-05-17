#![feature(try_from)]
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

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "message",
        description: "message entry",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Message>| {
            Ok(())
        },
        links: [
            from!(
                "channel",
                tag: "belongs_to",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            )
        ]
    )
}