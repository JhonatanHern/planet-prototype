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
pub struct User {
    username: String,
}

use crate::global_base;
use crate::utils;

pub fn handle_create_user( username : String ) -> ZomeApiResult<Address> {
    let user = User{
        username
    };
    let entry = Entry::App("user".into(), user.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&global_base::get_base_hash(), &address, "public for all")?;
    Ok(address)
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "user",
        description: "user entry",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<User>| {
            Ok(())
        },
        links: [
            from!(
                "global_base",
                tag: "public for all",
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
pub fn handle_get_all_users() -> ZomeApiResult<utils::GetLinksLoadResult<User>> {
    utils::get_links_and_load_type(&global_base::get_base_hash(), "public for all")
}