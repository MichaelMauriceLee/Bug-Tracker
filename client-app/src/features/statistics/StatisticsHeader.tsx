import React from "react"
import {Header, Image, Segment} from "semantic-ui-react"

const StatisticsHeader: React.FC = () => {
    return (
        <Segment>
            <Header as='h2'>
                Stats!
                <Header.Subheader>
                    I know how to query, eat your heart out TAs
                </Header.Subheader>
            </Header>
            <Image src={'/assets/spicy.jpg'} fluid/>
        </Segment>
    )
}

export default StatisticsHeader