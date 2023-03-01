import React, { useState, useEffect, useRef, useId, use } from "react";
import Select from "react-select";
import { network, Network } from "vis-network";
import styles from '@/styles/Home.module.css';

import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'

const Discover = () => {
    const customStyles = {
        input: (base) => ({
            ...base,
            color: "inherit"
        }),
        option: (base, state) => ({
            ...base,
            color: state.isFocused ? "white" : "black",
            backgroundColor: state.isFocused ? "#216ba5" : "white"
        }),
        control: (base, state) => ({
            ...base,
            background: "inherit",
            borderColor: state.isFocused ? "#878e9a" : "#878e9a",
            borderRadius: state.isFocused ? 0 : 0,
            boxShadow: state.isFocused ? null : null,
            "&:hover": {
                color: "white"
            }
        }),
        singleValue: (base) => ({
            ...base,
            color: "inherit"
        }),
        multiValue: (styles) => {
            return {
                ...styles,
                backgroundColor: "rgba(59,130,246,0.5)",
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "white",
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: "white",
            ':hover': {
                backgroundColor: "#3b82f6",
                color: 'white',
            },
        }),
        dropdownIndicator: (base) => ({
            ...base,
            "&:hover": {
                color: "white"
            }
        })
    };

    const imgUrl = "https://supertype.ai/wp-content/uploads/2021/08/T01MZ45DDEC-U01LVEC2423-e4e8be8fbe6f-192.jpeg";

    const dataNodes = [
        { id: 0, label: "Aurellia Christie", group: 0, shape: "circularImage", image: imgUrl },
        { id: 1, label: "Samuel Chan", group: 0, shape: "circularImage", image: imgUrl },
        { id: 2, label: "Vincentius C. Calvin", group: 0, shape: "circularImage", image: imgUrl },
        { id: 3, label: "Stane Aurelius", group: 0, shape: "circularImage", image: imgUrl },
        { id: 4, label: "Gerald Bryan", group: 0, shape: "circularImage", image: imgUrl },
        { id: 5, label: "Database", group: 1 },
        { id: 6, label: "Frontend", group: 1 },
        { id: 7, label: "Backend", group: 1 },
        { id: 8, label: "React", group: 2 },
        { id: 9, label: "PostgreSQL", group: 2 },
        { id: 10, label: "MySQL", group: 2 },
        { id: 11, label: "Django", group: 2 },
        { id: 12, label: "RESTAPI", group: 2 },
    ]

    const [nodes, setNodes] = useState(dataNodes);

    const edges = [
        { from: 0, to: 5 },
        { from: 0, to: 6 },
        { from: 0, to: 8 },
        { from: 0, to: 11 },
        { from: 1, to: 5 },
        { from: 1, to: 7 },
        { from: 1, to: 9 },
        { from: 1, to: 10 },
        { from: 1, to: 12 },
        { from: 2, to: 7 },
        { from: 2, to: 11 },
        { from: 2, to: 12 },
        { from: 3, to: 5 },
        { from: 3, to: 6 },
        { from: 3, to: 8 },
        { from: 3, to: 11 },
    ]

    const entities = [
        { "value": 0, "label": "Person" },
        { "value": 1, "label": "Skill" },
        { "value": 2, "label": "Tech" }]
    const [selectedEntities, setSelectedEntities] = useState(entities)

    const [selectedId, setSelectedId] = useState(dataNodes.map(dataNode => dataNode.id))
    const visJsRef = useRef(null);
    const options = {
        nodes: {
            shape: "dot",
            size: 30,
            font: {
                size: 18,
                color: "#ffffff",
            },
            borderWidth: 2,
        },
        edges: {
            width: 2,
        },
    };
    useEffect(() => {
        const network =
            visJsRef.current &&
            new Network(visJsRef.current, { nodes, edges }, options);
        // Use `network` here to configure events, etc
        network.on("click", (params) => {
            console.log(params)
            if (params.nodes[0] + 1) {
                const _selectedId = nodes.filter(node => node.id === params.nodes[0])[0].id
                let tempIds = [_selectedId];
                edges.forEach(function (edge) {
                    if (edge.from === _selectedId) {
                        tempIds.push(edge.to)
                    } else if (edge.to === _selectedId) {
                        tempIds.push(edge.from)
                    }
                })
                setSelectedId(tempIds)
                const filteredNodes = nodes.filter((dataNode) => tempIds.includes(dataNode.id))
                setNodes(filteredNodes)
            }
        })
    }, [visJsRef, nodes, edges]);

    const resetFilter = () => {
        setNodes(dataNodes)
        setSelectedEntities(entities)
        setSelectedId(dataNodes.map(dataNode => dataNode.id))
    }

    const handleFilter = (selected) => {
        const groups = selected.map((group) => group.value)
        setSelectedEntities(entities.filter(entity => groups.includes(entity.value)))
        const filteredNodes = dataNodes.filter((dataNode) => groups.includes(dataNode.group)).filter(dataNode => selectedId.includes(dataNode.id))
        setNodes(filteredNodes)
    }
    return (
        <main className={styles.main}>
            <section className="grid grid-cols-12">
                <div className="col-start-1 col-span-9">
                    <Select
                        options={entities}
                        value={selectedEntities}
                        defaultValue={[entities[0], entities[1], entities[2]]}
                        onChange={(selected) => {
                            handleFilter(selected)
                        }}
                        placeholder="Select Entities"
                        styles={customStyles}
                        isMulti
                        instanceId={useId()}
                    />
                </div>

                <div className="col-start-10 col-span-3 flex gap-x-2 max-w-xs">
                    <button
                        type="submit"
                        className="btn ml-2"
                        onClick={() => resetFilter()}>Reset</button>
                </div>
            </section>

            <div ref={visJsRef} className="w-screen h-screen" />
        </main>
    );
};

export default Discover