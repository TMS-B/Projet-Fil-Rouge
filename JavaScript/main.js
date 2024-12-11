

function HelloUser(){
    const ShowAccount = document.getElementById("ShowAccount");
    const AccountImg = document.querySelector(".AccountImg");
    let AccountData = JSON.parse(localStorage.getItem("SC_account")).username;

    if(!AccountData){
        return;
    }else{
        ShowAccount.innerHTML = `
        <div class="AccountName">
            <span>Bonjour<br>${AccountData}</span>
        </div>`
        ShowAccount.removeChild(AccountImg);
    }
}
HelloUser();