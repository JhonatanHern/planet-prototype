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

use std::time::{SystemTime, UNIX_EPOCH};

use crate::utils;


#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct Comment {
    text: String,
    timestamp : u128
}

pub fn handle_create_comment( text : String, discussion_addr: Address ) -> ZomeApiResult<Address> {
    let entry = Comment {
        text,
        timestamp: ((SystemTime::now()).duration_since(UNIX_EPOCH).expect("Time went backwards")).as_millis()
    };
    let entry = Entry::App("comment".into(), entry.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&discussion_addr, &address, "has_comment","")?;
    hdk::link_entries(&hdk::AGENT_ADDRESS,&address,"belongs_to","")?;
    Ok(address)
}
pub fn handle_get_discussion_comments(discussion_addr:Address) -> ZomeApiResult<utils::GetLinksLoadResult<Comment>> {
    utils::get_links_and_load_type(&discussion_addr, "has_comment".to_string())
}
pub fn handle_get_my_comments() -> ZomeApiResult<utils::GetLinksLoadResult<Comment>> {
    utils::get_links_and_load_type(&hdk::AGENT_ADDRESS, "belongs_to".to_string())
}
pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "comment",
        description: "discussion comments",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Comment>| {
            Ok(())
        },
        links: [
            from!(
                "discussion",
                link_type: "has_comment",
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
            )
        ]
    )
}