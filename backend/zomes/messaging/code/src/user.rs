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

pub fn handle_create_user( username : String ) -> ZomeApiResult<Address> {
    let user = User{username};
    let entry = Entry::App("user".into(), user.into());
    let address = hdk::commit_entry(&entry)?;
    Ok(address)
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "user",
        description: "message entry",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<User>| {
            Ok(())
        },
        links: [
            from!(
                "%agent_id",
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