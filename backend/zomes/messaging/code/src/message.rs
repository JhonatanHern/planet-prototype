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
#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct MessageWithSender {
    content: Message,
    author: Address
}

pub fn handle_send_message( entry : Message , channel_address : Address ) -> ZomeApiResult<Address> {
    let message = MessageWithSender{
        content : entry,
        author : Address::from(hdk::AGENT_ADDRESS.to_string())
    };
    let entry = Entry::App("message".into(), message.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&channel_address,&address,"has_message")?;
    Ok(address)
}
pub fn handle_send_private_message( entry : Message , conversation_address : Address ) -> ZomeApiResult<Address> {
    let message = MessageWithSender{
        content : entry,
        author : Address::from(hdk::AGENT_ADDRESS.to_string())
    };
    let entry = Entry::App("message".into(), message.into());
    let address = hdk::commit_entry(&entry)?;
    hdk::link_entries(&conversation_address,&address,"has_message")?;
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
                tag: "has_message",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            from!(
                "conversation",
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