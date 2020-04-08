import React from "react"
import {Header, Segment} from "semantic-ui-react"
import GeneralStatisticsList from "./GeneralStatisticsList"

const StatisticsHeader: React.FC = () => {
    return (
        <Segment>
            <Header as='h2' textAlign='center'>
                General Statistics
            </Header>
            <GeneralStatisticsList />
        </Segment>
    )
}

export default StatisticsHeader