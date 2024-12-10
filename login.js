let MyForm = document.getElementById("FormLogin");
let Result;
let Json;

MyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let Username = document.getElementById("Username");
    let Password = document.getElementById("Password");
    try {
        if (Username.value == "" || Password.value == ""){  
            throw new Error("Email et/ou mot de passe invalide");
        }
    // let Index = Result.indexOf((element) => console.log(element));
    // if (Index == -1){
    //     alert("L'email ou le mot de passe est incorrect");
    // }
        const Res = await fetch('./login.json');
        
        Json = await Res.json();
        
        Result = Json;
        console.log(Result);
    } catch (error) {
            document.getElementById("ErrorMessage").textContent = error.message;
        }
    // let Index = Results.indexOf((element) => element.Username === Username.value && element.Password === Password.value);
    
});