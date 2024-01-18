import React, { useEffect, useState } from 'react'

function user() {
  const [profile, setProfile] = useState({})
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("data"));
    const userData = user
    setProfile(userData)
  }, [])
  return (
    <div>

    </div>
  )
}

export default user