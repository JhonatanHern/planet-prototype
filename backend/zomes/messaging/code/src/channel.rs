#![feature(try_from)]
use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
    DNA_ADDRESS,
};
use hdk::holochain_core_types::{
    cas::content::Address,
    entry::Entry,
    dna::entry_types::Sharing,
    error::HolochainError,
    json::JsonString,
    validation::EntryValidationData
};

use crate::global_base;
use crate::utils;


#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct Channel {
    title: String,
    description: String,
}

pub fn handle_create_channel( entry : Channel ) -> ZomeApiResult<Address> {
    let entry = Entry::App("channel".into(), entry.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&global_base::get_base_hash(), &address, "public channels for all")?;
    Ok(address)
}
pub fn handle_get_all_channels() -> ZomeApiResult<utils::GetLinksLoadResult<Channel>> {
    utils::get_links_and_load_type(&global_base::get_base_hash(), "public channels for all")
}
pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "channel",
        description: "comunication mechanism in order to create private messages or groups",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Channel>| {
            Ok(())
        },
        links: [
            from!(
                "global_base",
                tag: "public channels for all",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            to!(
                "message",
                tag: "has_message",
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