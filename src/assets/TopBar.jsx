import { Dropdown } from "./Dropdown"

export default function TopBar({addEntity, turnCount, nextTurn, options, setOptions, clear}) {
    function toggleOption(name="autoRoll"){
        const newOptions = {...options}
        newOptions[name]= !newOptions[name]
        setOptions(newOptions)
        console.log(name + " toggled to " + newOptions[name])
    }

    return(<>
    <Dropdown>
        <Dropdown.Button>Add Character</Dropdown.Button>
        <Dropdown.Content>
            <Dropdown.List>
                <Dropdown.Item click={addEntity}>Add Single NPC</Dropdown.Item>
                <Dropdown.Item click={() => addEntity(parseInt(prompt("How many NPCs in this group?")))}>Add a Group</Dropdown.Item>
            </Dropdown.List>
        </Dropdown.Content>
    </Dropdown>
    <Dropdown>
        <Dropdown.Button>Options</Dropdown.Button>
        <Dropdown.Content>
            <Dropdown.List>
                <Dropdown.Switch label="Auto roll initiative" name="autoRoll" toggle={toggleOption} options={options}/>
                <Dropdown.Switch label="Enable max HP for NPCs (only works with newly added entities)" name="maxHPEnabled" toggle={toggleOption} options={options}/>
                <Dropdown.Switch label="Groups of NPCs are rendered together" name="groupTogether" toggle={toggleOption} options={options}/>
                <Dropdown.Switch label="Separately rendered groups of NPCs roll automatically" name="groupSplitAutoRoll" toggle={toggleOption} options={options}/>
            </Dropdown.List>
        </Dropdown.Content>
    </Dropdown>
    <button className="rounded-xl text-xl px-4 py-2 text-white bg-gray-500 flex items-center font-bold cursor-pointer duration-100 hover:shadow hover:shadow-amber-500 lg:text-3xl" onClick={() => nextTurn()}>Turn: {turnCount}</button>
    <button className="rounded-xl text-xl px-4 py-2 text-white bg-gray-500 flex items-center font-bold cursor-pointer duration-100 hover:shadow hover:shadow-amber-500 lg:text-3xl" onClick={() => clear()}>Clear</button>
    </>)
}