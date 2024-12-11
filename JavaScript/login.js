let MyForm = document.getElementById("FormLogin");
let Result;
let Json;

MyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let Username = document.getElementById("Username");
    let Password = document.getElementById("Password");
    try {
        if (Username.value == "" || Password.value == ""){  
            throw new Error("Email et/ou mot de passe incomplet");
        }
    
        const Res = await fetch('/login.json');
        Json = await Res.json();
        Result = Json;

        let Index = Result.findIndex((element) => element.email == Username.value && element.password == Password.value);
        console.log(Index)
        if (Index == -1){
            throw new Error("L'email ou le mot de passe est incorrect");
            // return;
        }
        localStorage.setItem("SC_account",JSON.stringify(Result[Index]));
        window.location.replace("/html/index.html")
    }catch (error) {
            document.getElementById("ErrorMessage").textContent = error.message;
    }

});