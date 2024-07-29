const getCurrentUnixTimestamp = ()=>{
    const currentDate = new Date();
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
    return unixTimestamp;
}

export default getCurrentUnixTimestamp;