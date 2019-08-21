import React from 'react'
import { Link } from 'react-router-dom'

const CommunityList = ({communities}) => (
    <div className='communities-list'>
        {
            communities &&
            communities.length > 0 &&
            communities.map((c,i)=>(
                <div key={i}>
                    <h5><Link to={'/communities/'+c.address}>{c.title}</Link></h5>
                    <p>
                        {c.description}
                    </p>
                </div>
            ))
        }
    </div>
)

export default CommunityList