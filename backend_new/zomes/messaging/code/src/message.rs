use hdk::holochain_core_types::{dna::entry_types::Sharing, entry::Entry};
use hdk::{entry_definition::ValidatingEntryType, error::ZomeApiResult};

use hdk::holochain_json_api::{error::JsonError, json::JsonString};

use hdk::holochain_persistence_api::cas::content::Address;

use crate::utils;

#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct Message {
    content: String,
}
#[derive(Serialize, Deserialize, Debug, DefaultJson, Clone)]
pub struct MessageWithSender {
    content: String,
    author: String,
}

pub fn handle_send_message(entry: Message, channel_address: Address) -> ZomeApiResult<Address> {
    let message = MessageWithSender {
        content: entry.content,
        author: hdk::AGENT_ADDRESS.to_string(),
    };
    let entry = Entry::App("message".into(), message.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&channel_address, &address, "has_message", "")?;
    Ok(address)
}
pub fn handle_send_private_message(
    entry: Message,
    conversation_address: Address,
) -> ZomeApiResult<Address> {
    let message = MessageWithSender {
        content: entry.content,
        author: hdk::AGENT_ADDRESS.to_string(),
    };
    let entry = Entry::App("message".into(), message.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&conversation_address, &address, "conver", "")?;
    Ok(address)
}
pub fn handle_get_messages_from_channel(
    channel: Address,
) -> ZomeApiResult<utils::GetLinksLoadResult<MessageWithSender>> {
    utils::get_links_and_load_type(&channel, "has_message".to_string())
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
                link_type: "has_message",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            from!(
                "conversation",
                link_type:"conver",
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