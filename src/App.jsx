import { useState } from 'react'
import TopBar from './assets/TopBar.jsx';
import PWABadge from './PWABadge.jsx'
import Entity from './assets/Entity.jsx';
import { sortEntities } from './assets/utils.js';

function App() {
  const [turnCount, setTurnCount] = useState(0);
  const [options, setOptions] = useState({
    autoRoll: true,
    maxHPEnabled: false,
    groupTogether: true,
    groupSplitAutoRoll: true
  });
  const [entities, setEntities] = useState([]);

  function turn(entitiesList){
    const entitiesCopy = [...entitiesList];
    if (entitiesCopy.length === 0) return [];
    console.log('step1')
    var currentIndex = entitiesCopy.findIndex((ent) => ent.current);
    console.log('currentIndex', currentIndex)
    if (currentIndex === -1){
      entitiesCopy[0].current = true;
      setTurnCount(turnCount + 1);
      return entitiesCopy;
    }
    entitiesCopy[currentIndex].current = false;
    if (currentIndex === entitiesCopy.length - 1){
      setTurnCount(turnCount + 1);
      currentIndex = 0
    } else {
      currentIndex += 1
    }
    while (!entitiesCopy[currentIndex].alive){
      if (currentIndex === entitiesCopy.length - 1){
        currentIndex = 0
        setTurnCount(turnCount + 1);
      } else {
        currentIndex += 1
      }
    }
    entitiesCopy[currentIndex].current = true;
    return entitiesCopy;
  }

  function turnAndSet(){
    const newEntities = turn(entities);
    setEntities(newEntities);
  }

  function clearAll(){
    setEntities([]);
    setTurnCount(0);
  }

  function removeEntity(id){
    var entitiesCopy = [...entities];
    const toRemove = entitiesCopy.findIndex((ent) => ent.id === id);
    if (entitiesCopy[toRemove].current && entitiesCopy.length > 1){
      entitiesCopy = turn(entitiesCopy);
    }
    entitiesCopy.splice(entitiesCopy.findIndex((ent) => ent.id === id), 1)
    setEntities(entitiesCopy);
  }

  function addEntity(number=1){
    const name = prompt("Enter the name of the entity:", "Entity");
    if (!name) return;
    const newEntity = {name: name, id: Date.now(), dmg: {1: 0}, maxHP: -1, initiative: 0, iniBonus: 0, number: number, alive: true, current: false};
    const iniBonus = parseInt(prompt("Enter the initiative bonus of " + name + ":", "0"));
    if (!iniBonus && iniBonus !== 0) return;
    newEntity.iniBonus = iniBonus;
    if (options.maxHPEnabled){
      const maxHp = parseInt(prompt("Enter the max HP of " + name + ":", "10"));
      if (!maxHp && maxHp !== 0) return;
      newEntity.maxHP = maxHp;
    }
    if (number > 1){
      if (!options.groupTogether){
        const newGroup = [];
        if (options.autoRoll || options.groupSplitAutoRoll){
          for (let i = 1; i <= number; i++) {
            const entityCopy = {...newEntity};
            const initiative = Math.floor(Math.random() * 20) + 1 + iniBonus;
            entityCopy.initiative = initiative;
            entityCopy.id = Date.now() + i;
            entityCopy.number = 1;
            newGroup.push(entityCopy);
          }
        }
        else {
          for (let i = 1; i <= number; i++) {
            const entityCopy = {...newEntity};
            const initiative = parseInt(prompt("Enter the initiative roll of " + name + ":", "0"));
            if (!initiative && initiative !== 0) return
            entityCopy.initiative = initiative;
            entityCopy.id = Date.now() + i;
            entityCopy.number = 1;
            newGroup.push(entityCopy);
          }
        }
        setEntities(sortEntities([...entities, ...newGroup], update));
        return;
      } else {
        for (let i = 2; i <= number; i++) {
          newEntity.dmg[i] = 0;
        }
      }
    }
    if (options.autoRoll) {
      const initiative = Math.floor(Math.random() * 20) + 1 + iniBonus;
      newEntity.initiative = initiative;
    }
    else {
      const initiative = parseInt(prompt("Enter the initiative roll of " + name + ":", "0"));
      newEntity.initiative = initiative;
    }
    setEntities(sortEntities([...entities, newEntity], update));
    return;
  }

  function update(value, id, toChange){
    const entitiesCopy = [...entities];
    const updatedEntity = entitiesCopy.find((entity) => entity.id === id);
    entitiesCopy.splice(entitiesCopy.indexOf(updatedEntity), 1);
    updatedEntity[toChange] = parseInt(value);
    entitiesCopy.push(updatedEntity);
    setEntities(sortEntities(entitiesCopy));
  }

  function updateHP(value, id, number = 1){
    const entitiesCopy = [...entities];
    const updatedEntity = entitiesCopy.find((entity) => entity.id === id);
    entitiesCopy.splice(entitiesCopy.indexOf(updatedEntity), 1);
    updatedEntity.dmg[number] = parseInt(value);
    const dmgValues = Object.values(updatedEntity.dmg);
    if (Math.min(...dmgValues) >= updatedEntity.maxHP && updatedEntity.maxHP != -1){
      updatedEntity.alive = false;
    } else {
      updatedEntity.alive = true;
    }
    entitiesCopy.push(updatedEntity);
    setEntities(sortEntities(entitiesCopy));
  }

  return (
    <>
    <header className='py-3 flex flex-row justify-center bg-slate-300 gap-2 flex-wrap'>
      <TopBar options={options} setOptions={setOptions} addEntity={addEntity} turnCount={turnCount} nextTurn={turnAndSet} clear={clearAll}/>
    </header>
    <main>
      <ul className='flex flex-col gap-4 m-4 items-center'>
        {entities.map((entity) => <Entity key={entity.id} ent={entity} update={update} close={removeEntity} updateHP={updateHP}/>)}
      </ul>
    </main>
    <PWABadge />
    </>
  )
}

export default App
