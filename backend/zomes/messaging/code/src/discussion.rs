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

use crate::utils;


#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct Discussion {
    title: String,
    description: String,
}

pub fn handle_create_discussion( entry : Discussion, group_addr: Address ) -> ZomeApiResult<Address> {
    let entry = Entry::App("channel".into(), entry.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&group_addr, &address, "has_discussion","")?;
    hdk::link_entries(&hdk::AGENT_ADDRESS,&address,"belongs_to","")?;
    Ok(address)
}
pub fn handle_get_group_discussions(group_addr:Address) -> ZomeApiResult<utils::GetLinksLoadResult<Discussion>> {
    utils::get_links_and_load_type(&group_addr, "has_discussion".to_string())
}
pub fn handle_get_my_discussions() -> ZomeApiResult<utils::GetLinksLoadResult<Discussion>> {
    utils::get_links_and_load_type(&hdk::AGENT_ADDRESS, "discuss".to_string())
}
pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "channel",
        description: "comunication mechanism in order to create private messages or groups",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Discussion>| {
            Ok(())
        },
        links: [
            from!(
                "group",
                link_type: "has_discussion",
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
                "comment",
                link_type: "has_comment",
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