import React,{useState} from 'react'

const Folder = ({ explorer }) => {
    const [expand, setExpand] = useState(false)

    if(explorer.isFolder) {
        return (
            <div>
                <span onClick={() => setExpand(!expand)}>
                    {explorer.name}
                    <br />
                </span>
                <div style={{ display: expand ? 'block' : 'none', paddingLeft: "20px" }}>
                    {explorer.data?.map((exp) => {
                        return (
                            <Folder key={exp.name} explorer={exp} />
                        )
                    })}
                </div>
            </div>
            )
    } else {
        return (
            <span>
                {explorer.name}
                <br/>
            </span>
        )
    }
}

export default Folder