use core::convert::TryFrom;
use hdk::{
    self,
    holochain_core_types::{
    	entry::{AppEntryValue, Entry},
    },
    error::{ZomeApiResult, ZomeApiError},
};
use hdk::holochain_core_types::{
    link::LinkMatch,
};
use hdk::holochain_persistence_api::{
    cas::content::Address,
};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct GetLinksLoadElement<T> {
	pub address: Address,
	pub entry: T
}

pub type GetLinksLoadResult<T> = Vec<GetLinksLoadElement<T>>;



pub fn get_links_and_load(
    base: &Address,
    tag: String
) -> ZomeApiResult<GetLinksLoadResult<Entry>>  {
	let get_links_result = hdk::get_links(base, LinkMatch::Exactly(&tag), LinkMatch::Any)?;

	Ok(get_links_result.addresses()
	.iter()
	.map(|address| {
		hdk::get_entry(&address.to_owned())
		.map(|entry: Option<Entry>| {
			GetLinksLoadElement{
				address: address.to_owned(),
				entry: entry.unwrap()
			}
		})
	})
	.filter_map(Result::ok)
	.collect())
}

pub fn get_links_and_load_type<
	// S: Into<String>,
	R: TryFrom<AppEntryValue>
>(
    base: &Address,
    tag: String
) -> ZomeApiResult<GetLinksLoadResult<R>> {
	let link_load_results = get_links_and_load(base, tag)?;

	Ok(link_load_results
	.iter()
	.map(|get_links_result| {

		match get_links_result.entry.clone() {
			Entry::App(_, entry_value) => {
				let entry = R::try_from(entry_value)
				.map_err(|_| ZomeApiError::Internal(
					"Could not convert get_links result to requested type".to_string())
				)?;

	            Ok(GetLinksLoadElement::<R>{
	                entry: entry, 
	                address: get_links_result.address.clone()
	            })
			},
			_ => Err(ZomeApiError::Internal(
				"get_links did not return an app entry".to_string())
			)
		}
	})
	.filter_map(Result::ok)
	.collect())
}
/*
pub fn link_entries_bidir(a: &Address, b: &Address, tag_a_b: &str, tag_b_a: &str) -> ZomeApiResult<()> {
    hdk::link_entries(a, b, tag_a_b, "")?;
    hdk::link_entries(b, a, tag_b_a, "")?;
    Ok(())
}
*/
