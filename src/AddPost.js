import React from "react" ;

export default function AddPost() {
return(
    <div className="border p-3 mt-3 bg-light" style={{ position:"fixed"}}>
        <h2>Add Post</h2>
        <label htmlFor="">Topic</label>
        <input type="text" name="Topic" classname="input-control" />
        {/*discription*/}
        <label htmlFor="">Discription</label>
        <input type="text" name="Discription" classname="input-control" />
        <button className="input-control-button">post</button>
</div>
);
}