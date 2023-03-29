import { VictoryChart, VictoryBar, VictoryTheme, VictoryPolarAxis, VictoryTooltip } from "victory";

const GithubMonthlyCommit = ({ data }) => {
    return (
        <VictoryChart theme={VictoryTheme.material} polar>
            <VictoryPolarAxis dependentAxis
                style={{
                    axis: {
                        stroke: "none",
                    },
                }}
                tickFormat={() => null}
            />
            <VictoryPolarAxis
                // axis labels color
                style={{
                    axisLabel: { padding: 10, fontSize: 10, fill: "white" },
                    axis: { stroke: "none" },
                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 },
                    tickLabels: { fill: "white" }
                }}
            />
            <VictoryBar
                style={{
                    data: { fill: ({ datum }) => datum.y > 3 ? "#c39f61" : "#b1976b ", width: 30, fillOpacity: 0.75 },
                    labels: {
                        fontSize: 12,
                        // fill: "white",
                    }
                }}
                data={data}
                scale="log"
                animate={{
                    duration: 5000,
                    easing: "bounce"
                }}
                labelComponent={<VictoryTooltip />}
            // disable guides 

            />
        </VictoryChart>
    );
}

export default GithubMonthlyCommit