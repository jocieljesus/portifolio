const USUARIOS_SALVOS = "usuariosSalvos";
const listaUsuarios = JSON.parse(localStorage.getItem(USUARIOS_SALVOS)) || [];

// ================= CADASTRO =================
const formCadastro = document.querySelector("#area-cadastro");
const btnCadastrar = document.querySelector("#btn-cadastrar");

if (formCadastro) {
  const msgCadastro = document.querySelector("#msg-cadastro");

  // Limpa mensagem de erro ao digitar em qualquer campo do cadastro
  formCadastro.addEventListener("input", () => {
    msgCadastro.textContent = "";
  });

  formCadastro.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nomeInput = document.querySelector("#nome").value.trim();
    const usuarioInput = document.querySelector("#usuario").value.trim();
    const emailInput = document.querySelector("#email").value.trim();
    const senhaInput = document.querySelector("#senha").value;
    const confirmaSenhaInput = document.querySelector("#confirma-senha").value;

    if (senhaInput !== confirmaSenhaInput) {
      msgCadastro.textContent = "As senhas não coincidem";
      msgCadastro.style.color = "red";
      return;
    }

    btnCadastrar.disabled = true;
    btnCadastrar.innerHTML = '<span class="loading"></span> Validando...';

    setTimeout(() => {
      const emailJaExiste = listaUsuarios.some(
        (u) => u.email.toLowerCase() === emailInput.toLowerCase()
      );
      const usuarioJaExiste = listaUsuarios.some(
        (u) => u.usuario.toLowerCase() === usuarioInput.toLowerCase()
      );

      if (usuarioJaExiste) {
        msgCadastro.textContent = "Usuário já cadastrado!";
        msgCadastro.style.color = "red";
        btnCadastrar.disabled = false;
        btnCadastrar.innerHTML = "Cadastrar";
        return;
      }

      if (emailJaExiste) {
        msgCadastro.textContent = "Email já cadastrado!";
        msgCadastro.style.color = "red";
        btnCadastrar.disabled = false;
        btnCadastrar.innerHTML = "Cadastrar";
        return;
      }

      const novoUsuario = {
        nome: nomeInput,
        usuario: usuarioInput,
        email: emailInput,
        senha: senhaInput
      };

      listaUsuarios.push(novoUsuario);
      localStorage.setItem(USUARIOS_SALVOS, JSON.stringify(listaUsuarios));

      msgCadastro.textContent = "Cadastro realizado com sucesso!";
      msgCadastro.style.color = "green";
      formCadastro.reset();

      btnCadastrar.disabled = false;
      btnCadastrar.innerHTML = "Cadastrar";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500)

    }, 1500);
  });
}

// ================= LOGIN =================
const formLogar = document.querySelector("#area-login");
const btnAcessar = document.querySelector("#btn-acessar");

if (formLogar) {
  const emailInput = document.querySelector("#email");
  const senhaInput = document.querySelector("#senha"); // Elemento, sem .value aqui!
  const msgLogin = document.getElementById("msg-login");

  // Limpa a mensagem de erro ao digitar no e-mail ou na senha
  [emailInput, senhaInput].forEach((campo) => {
    campo.addEventListener("input", () => {
      msgLogin.textContent = "";
    });
  });

  formLogar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const loginDigitado = emailInput.value.trim().toLowerCase();
    const senhaDigitada = senhaInput.value;

    btnAcessar.disabled = true;
    btnAcessar.innerHTML = '<span class="loading"></span> Entrando...';

    setTimeout(() => {
      // .find() retorna o objeto do usuário, e os parênteses garantem que a senha sempre seja checada
      const usuarioEncontrado = listaUsuarios.find(
        (u) =>
          (u.usuario.toLowerCase() === loginDigitado||
            u.email.toLowerCase() === loginDigitado) &&
          u.senha === senhaDigitada
      );

      if (!usuarioEncontrado) {
        msgLogin.textContent = "Usuário ou Senha Incorretos!";
        msgLogin.style.color = "red";
        btnAcessar.disabled = false;
        btnAcessar.innerHTML = "Acessar";
        return;
      }

      const sessao = {
        nome: usuarioEncontrado.nome,
        usuario: usuarioEncontrado.usuario,
        email: usuarioEncontrado.email
      };

      localStorage.setItem("usuarioLogado", JSON.stringify(sessao));

      msgLogin.textContent = "Login realizado! Redirecionando...";
      msgLogin.style.color = "#2ecc71";

      setTimeout(() => {
        window.location.href = "index.html";
      }, 600);
    }, 1200);
  });
}