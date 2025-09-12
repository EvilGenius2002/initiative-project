import { Dropdown } from "./Dropdown"

export default function Entity({ent, close, update, updateHP}) {
    const {name, initiative, id, number=1, dmg={1:0}, maxHP, alive, current} = ent

    var classes = 'flex flex-row border border-gray-700 rounded-full h-20 w-fit duration-150 items-center alig-middle '
    var buttonClasses = 'h-20 w-20 text-center text-4xl font-bold border-gray-700 hover:border box-border  '
    var inputIniClasses = 'h-20 w-20 text-center text-4xl font-bold text-green-900 rounded-l-full '
    var inputDmgClasses = 'h-20 w-20 text-center text-4xl font-bold text-red-600 '
    
    if (alive) {
        classes += ' bg-slate-300 '
        buttonClasses += ' hover:bg-slate-400 '
    } else {
        classes += ' bg-zinc-500 '
        buttonClasses += ' hover:bg-gray-600 '
    }

    if (current){
        classes += ' ring-4 ring-amber-400 '
    }
    if (number > 1) {
        const dmgArray = []
        for (let i = 1; i <= number; i++) {
            dmgArray.push(dmg[i])
        }


        return (
            <li className={`${classes}`}>
                <input className= {`${inputIniClasses}`} type="number" defaultValue={initiative} onBlur={(e) => update(e.target.value, id, "initiative")}/>
                <h3 className="text-2xl font-bold h-min flex flex-row">Group of <span className="text-3xl text-amber-900 mx-1">{name}</span> Number in group: </h3>
                <Dropdown>
                    <Dropdown.Button className={buttonClasses + " text-amber-500 rounded-xl"}>{number}</Dropdown.Button>
                    <Dropdown.Content>
                        <Dropdown.List>
                            {dmgArray.map((dmgValue, index) => 
                            <GroupMember key={index + 1} dmgValue={dmgValue} index={index} maxHP={maxHP} updateHP={updateHP} id={id} inputDmgClasses={inputDmgClasses}/>)}
                        </Dropdown.List>
                    </Dropdown.Content>
                </Dropdown>
                <button onClick={() => close(id)} className= {`${buttonClasses + ' rounded-r-full'}`}>X</button>
            </li>
        )
    }

    return (
        <li className={`${classes}`}>
            <input className= {`${inputIniClasses}`} type="number" defaultValue={initiative} onBlur={(e) => update(e.target.value, id, "initiative")}/>
            <h3 className="text-2xl font-bold h-min"><span className="text-3xl text-amber-900 mx-1">{name}</span> Damage taken:</h3>
            <input className={`${inputDmgClasses}`} type="number" defaultValue={dmg[1]} onBlur={(e) => updateHP(e.target.value, id, 1)}/>
            <button onClick={() => close(id)} className= {`${buttonClasses + ' rounded-r-full'}`} >X</button>
        </li>
    )
}


function GroupMember({dmgValue, index, id, maxHP, updateHP, inputDmgClasses}){
    return(
        <li key={index + 1} className={`flex flex-row w-max justify-between items-center duration-150 py-3 px-5  ${(dmgValue >= maxHP && maxHP > -1) ? "bg-zinc-500":"bg-slate-300"}`}>
            <div className="text-center text-2xl font-bold">Number {index + 1}:</div>
            <input type="number" className={`${inputDmgClasses}`} defaultValue={dmgValue} onBlur={(e) => updateHP(e.target.value, id, index + 1)}/>
            {(maxHP != -1) ? <div className={inputDmgClasses + ' h-min'}>/{maxHP}</div> : ''}
        </li>
    )
}