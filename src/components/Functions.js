
export const actualDate = ()=>{
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return [dd, mm, yyyy];
}

export const dayPerMonth = (month, year) => {
    let days = new Date(year, month, 0).getDate();
    let daysArray = new Array(days);
    for(let i = 0; i<days; i++) daysArray[i] = i+1;
    return [...daysArray];
}

export const textDate = (month) => {
    let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    return months[month-1];
}