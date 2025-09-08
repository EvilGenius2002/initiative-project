import { useState } from 'react'
import { Dropdown } from './assets/Dropdown.jsx'
import PWABadge from './PWABadge.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex flex-row justify-center'>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Dropdown>
        <Dropdown.Button>Add Character</Dropdown.Button>
        <Dropdown.Content>
          <Dropdown.List>
            <Dropdown.Item>Add Single NPC</Dropdown.Item>
            <Dropdown.Item>Add a Group</Dropdown.Item>
          </Dropdown.List>
        </Dropdown.Content>
      </Dropdown>
      <Dropdown>
        <Dropdown.Button>Open Me!!!!</Dropdown.Button>
        <Dropdown.Content>
          <div className="p-4">
            <p>This is some custom content!</p>
            <p>You can put anything you want here.</p>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => alert('Button inside dropdown clicked!')}>
              Click Me
            </button>
          </div>
        </Dropdown.Content>
      </Dropdown>
    </div>
      <PWABadge />
    </>
  )
}

export default App
