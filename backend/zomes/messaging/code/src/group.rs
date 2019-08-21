use hdk::{
    entry_definition::ValidatingEntryType,
    error::ZomeApiResult,
};
use hdk::holochain_core_types::{
    entry::Entry,
    dna::entry_types::Sharing,
};

use hdk::holochain_persistence_api::{
    cas::content::Address,
};

use hdk::holochain_json_api::{
    error::JsonError,
    json::JsonString,
};

use crate::global_base;
use crate::utils;


#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct Group {
    title: String,
    description: String,
    values: String,
    goals: String,
    purpose: String,
    vision: String,
}

pub fn handle_create_group( entry : Group ) -> ZomeApiResult<Address> {
    let entry = Entry::App("group".into(), entry.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&global_base::get_base_hash(), &address, "public groups for all","")?;
    hdk::link_entries(&hdk::AGENT_ADDRESS,&address,"belongs_to","")?;
    Ok(address)
}
pub fn handle_get_all_groups() -> ZomeApiResult<utils::GetLinksLoadResult<Group>> {
    utils::get_links_and_load_type(&global_base::get_base_hash(), "public groups for all".to_string())
}
pub fn handle_get_my_groups() -> ZomeApiResult<utils::GetLinksLoadResult<Group>> {
    utils::get_links_and_load_type(&hdk::AGENT_ADDRESS, "belongs_to".to_string())
}
pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "group",
        description: "similar to facebook groups",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Group>| {
            Ok(())
        },
        links: [
            from!(
                "global_base",
                link_type: "public groups for all",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            from!(
                "%agent_id",
                link_type: "belongs_to",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            to!(
                "discussion",
                link_type: "has_discussion",
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