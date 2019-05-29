import { connect } from '@holochain/hc-web-client'

const is_the_connection_a_test = true

export default ({ functionName , params = {} , callback = _ => {} }) => {
    connect("ws://localhost:8888").then(({callZome, close}) => {
        callZome(is_the_connection_a_test?'test-instance':'holo-chat','messaging' , functionName )( params ).then((result) => {
            console.log(`HC CALL${functionName}, received `,result)
            callback(JSON.parse(result))
            close()
        })
    })
}