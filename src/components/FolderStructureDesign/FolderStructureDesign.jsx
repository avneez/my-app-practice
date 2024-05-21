import React from 'react'
import Folder from './components/Folder'
import explorer from './data/folderData'

const FolderStructureDesign = () => {
  
  return (
    <div>
        <Folder explorer={explorer} />
    </div>
  )
}

export default FolderStructureDesign