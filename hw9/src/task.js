import { auth, firestore } from "./initialize";
import { addDoc, collection, getDocs } from "@firebase/firestore";
const tasks = [
    { id: 1, name: 'Studying', points: 10}, { id: 2, name: 'Job Search', points:9},
    { id: 3, name: 'Journalling', points:8}, { id: 4, name: 'Lectures', points: 8},
    { id: 5, name: 'Reading', points: 8}, { id: 6, name: 'Working', points:7.5},
    { id: 7, name: 'Podcast', points:7}, { id: 8, name: 'Physical Exercise', points:8},
    { id: 9, name: 'Sleep', points:10}, { id: 10, name: 'Meditation', points:5},
    ]
    
    
    export default function Example() {

      return (
        <fieldset>
          <legend className="text-lg font-medium text-gray-900">Activities</legend>
        
          <div style={{maxWidth:"30%"}} className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
            {tasks.map((person, personIdx) => (
              <div key={personIdx} className="relative flex items-start py-4">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor={`person-${person.id}`} className="select-none font-medium text-gray-700">
                    {person.name}
                  </label>
                </div>
                <div className="ml-3 flex h-5 items-center">
                  <input
                    id={`person-${person.id}`}
                    name={`person-${person.id}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
              </div>
            ))}

            <button onClick={() =>{ 
                let activities = []
                const roomsCollectionRef = collection(firestore, "rooms");

                for(let i = 0; i < 10; i++){
                    let curcheckbox = document.getElementById(`person-${tasks[i].id}`)
                    console.log(curcheckbox.checked)
                    if(curcheckbox.checked){
                        let Data = {
                            name: tasks[i].name,
                            points: tasks[i].points,
                          }
                          console.log(Data)
                        activities.push(Data)
                    }
                }
                let userData = {activies: activities, ownerId: auth.currentUser.uid}
                console.log(userData)
                addDoc(roomsCollectionRef, userData)

            }}>Input</button>
          </div>
        </fieldset>
      )
    }
    