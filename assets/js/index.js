console.log("Entro index.js");

let citas = JSON.parse(localStorage.getItem("citas")) || [];

const inputNombredelpaciente = document.getElementById("inputNombredelpaciente");
const inputLesion = document.getElementById("inputLesion");
const inputBitacora = document.getElementById("inputBitacora");
const inputProximacita = document.getElementById("inputProximacita");

const btnAccion = document.getElementById("btnAccion");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const divCitas = document.getElementById("divCitas");

let indexEditar = null;

class Cita {
  constructor(Nombredelpaciente, lesion, bitacora, proximacita) {
    this.Nombredelpaciente = Nombredelpaciente;
    this.lesion = lesion;
    this.bitacora = bitacora;
    this.proximacita = proximacita;
  }
}

function guardarCita() {
  let nombredelpaciente = inputNombredelpaciente.value;
  let lesion = inputLesion.value;
  let bitacora = inputBitacora.value;
  let proximacita = inputProximacita.value;

  if (nombredelpaciente === "" || lesion === "" || bitacora === "" || proximacita === "") {
    alert("Por favor, complete todos los campos.");
    return;
  }

  if (indexEditar === null) {
    // Crear nueva cita y agregarla al arreglo
    let cita = new Cita(nombredelpaciente, lesion, bitacora, proximacita);
    citas.push(cita);
  } else {
    // Actualizar la cita existente
    citas[indexEditar].Nombredelpaciente = nombredelpaciente;
    citas[indexEditar].lesion = lesion;
    citas[indexEditar].bitacora = bitacora;
    citas[indexEditar].proximacita = proximacita;

    // Restaurar el texto del botón de acción a "GUARDAR"
    btnAccion.innerText = "GUARDAR";
    indexEditar = null;
  }

  limpiarFormularioCita();
  localStorage.setItem("citas", JSON.stringify(citas));
  mostrarCitas();
}

function borrarTodo() {
  localStorage.clear();
  citas = [];
  mostrarCitas();
  alert("Se borraron las citas");
}

function editarCita(index) {
  // Llenar el formulario con la cita que se va a editar
  inputNombredelpaciente.value = citas[index].Nombredelpaciente;
  inputLesion.value = citas[index].lesion;
  inputBitacora.value = citas[index].bitacora;
  inputProximacita.value = citas[index].proximacita;

  // Cambiar el texto del botón de acción a "EDITAR"
  btnAccion.innerText = "EDITAR";
  indexEditar = index;
}

function eliminarCita(index) {
  citas.splice(index, 1);
  localStorage.setItem("citas", JSON.stringify(citas));
  mostrarCitas();
}

function mostrarCitas() {
  divCitas.innerHTML = "";

  if (citas.length === 0) {
    divCitas.innerHTML = `
      <div class="alert alert-info" role="alert" id="alertSinCitas">
          No hay citas agregadas
      </div>`;
  } else {
    citas.forEach((cita, index) => {
      divCitas.innerHTML += `
          <div class="card mb-3">
             <div class="row g-0">
                <div class="col-md-8">
                   <div class="card-body">
                      <h5 class="card-title">${cita.Nombredelpaciente}</h5>
                      <p class="card-text">${cita.lesion}</p>
                      <p class="card-text">${cita.bitacora}</p>
                      <p class="card-text">${cita.proximacita}</p>
                      <div class="row mb-2">
                         <div class="col">
                            <button class="btn btn-info w-100 mt-2" type="button" id="editar-${index}" onclick="editarCita(${index})">Editar</button>
                         </div>
                         <div class="col">
                            <button class="btn btn-success w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarCita(${index})">Eliminar</button>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
      `;
    });
  }
}

function limpiarFormularioCita() {
  inputNombredelpaciente.value = "";
  inputLesion.value = "";
  inputBitacora.value = "";
  inputProximacita.value = "";
}

btnAccion.addEventListener("click", guardarCita);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarCitas();
