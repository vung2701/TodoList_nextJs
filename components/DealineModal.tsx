
import Button from "./Button"


const DeadlineModal = () => {
 return (
    <div className="mx-auto bg-white border border-gray-800 w-1/3 px-10 py-10 rounded z-10">
    <div className="w-full">
      <label htmlFor="">Time dealine: </label>
      <input 
        type="text" 
        className="border border-gray-400 rounded px-2 py-2"
        placeholder="Input a todo deadline..."

    />
    </div>
    <Button>Add</Button>
    <Button>Cancel</Button>
  </div>
 )
}

export default DeadlineModal