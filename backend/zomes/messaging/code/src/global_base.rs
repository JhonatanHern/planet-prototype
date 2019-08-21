use hdk::{
    entry_definition::ValidatingEntryType,
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

#[derive(Serialize, Deserialize, Debug, DefaultJson,Clone)]
pub struct Base {
    seed: String,
}

pub fn get_base_entry() -> Base{
    Base {
        seed:String::from("horse")
    }
}
pub fn get_base_hash()  -> Address{
    let entry = Entry::App("global_base".into(),get_base_entry().into());
    hdk::commit_entry(&entry).unwrap()
}

pub fn definition() -> ValidatingEntryType {
    entry!(
        name: "global_base",
        description: "global base to link users and channels",
        sharing: Sharing::Public,
        validation_package: || {
            hdk::ValidationPackageDefinition::Entry
        },
        validation: | _validation_data: hdk::EntryValidationData<Base>| {
            Ok(())
        },
        links: [
            to!(
                "channel",
                link_type: "public channels for all",
                validation_package: || {
                    hdk::ValidationPackageDefinition::Entry
                },
                validation: |_validation_data: hdk::LinkValidationData| {
                    Ok(())
                }
            ),
            to!(
                "user",
                link_type: "public for all",
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