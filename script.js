window.onload = function () {
    const pai = document.getElementById('lista-tarefas');
    let armazenadas = JSON.parse(localStorage.getItem('lista-tarefas'));

    if (armazenadas !== null) {

        for (let id = 0; id < armazenadas.length; id += 1) {
            let text = armazenadas[id];

            if (text !== ',') {
                if (text.includes('completed')) {
                    let criarLi = document.createElement('li');
                    let righttext = text.substring(0, text.length - 10); //ideia veio desse código: https://www.devmedia.com.br/javascript-substring-selecionando-parte-de-uma-string/39232
                    criarLi.innerText = righttext;
                    criarLi.className = 'item-lista completed'
                    criarLi.addEventListener('click', mudaBg);
                    criarLi.addEventListener('dblclick', complete);
                    pai.appendChild(criarLi);

                } else {
                    let criarLi = document.createElement('li');
                    criarLi.innerText = text;
                    criarLi.className = 'item-lista'
                    criarLi.addEventListener('click', mudaBg);
                    criarLi.addEventListener('dblclick', complete);
                    pai.appendChild(criarLi);
                }

            }
        }
    }
}

const botaoCria = document.getElementById('criar-tarefa');
botaoCria.addEventListener('click', addtask);
const inputcria = document.getElementById('texto-tarefa');
inputcria.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        addtask();
    }
})

function addtask() {
    let text = document.getElementById('texto-tarefa').value;
    const pai = document.getElementById('lista-tarefas');

    if (text == '') {
        alert('Você não inseriu nenhuma tarefa')
    } else {
        let criarLi = document.createElement('li');
        criarLi.innerText = text;
        criarLi.className = 'item-lista'
        criarLi.addEventListener('click', mudaBg);
        criarLi.addEventListener('dblclick', complete);
        pai.appendChild(criarLi);
    }

    document.getElementById('texto-tarefa').value = '';
}

function mudaBg(event) {
    let mudando = event.target;
    let lista = document.getElementsByClassName('item-lista');

    for (let i = 0; i < lista.length; i += 1) {
        lista[i].id = '';
    }

    mudando.id = 'selected';
}

function complete(event) {
    let mudando = event.target;

    if (mudando.className == 'item-lista') {
        mudando.className = 'item-lista completed';
    } else {
        mudando.className = 'item-lista';
    }
}

const botaoApaga = document.getElementById('apaga-tudo');
botaoApaga.addEventListener('click', clearAll);

function clearAll() {
    let apagar = document.querySelectorAll('.item-lista');

    for (let id = 0; id < apagar.length; id += 1) {
        apagar[id].remove();
    }
}

const botaoRemoveFinalizados = document.getElementById('remover-finalizados');
botaoRemoveFinalizados.addEventListener('click', clearFinalizados);

function clearFinalizados() {
    let apagar = document.querySelectorAll('.completed');

    for (let id = 0; id < apagar.length; id += 1) {
        apagar[id].remove();
    }
}

const botaoSalva = document.getElementById('salvar-tarefas');
botaoSalva.addEventListener('click', salvaInStorage);

function salvaInStorage() {
    let listaemArray = [];
    let list = document.querySelectorAll('.item-lista');


    for (let id = 0; id < list.length; id += 1) {

        if (list[id].className == 'item-lista completed') {
            listaemArray.push(list[id].innerText + ' completed');
        } else {
            listaemArray.push(list[id].innerText);
        }
    }

    localStorage.setItem('lista-tarefas', JSON.stringify(listaemArray));
}

const botaoSobe = document.getElementById('mover-cima');
const botaoDesce = document.getElementById('mover-baixo');

botaoSobe.addEventListener('click', sobe);
botaoDesce.addEventListener('click', desce);

function sobe() {
    const selecionado = document.querySelector('#selected');

    if (selecionado !== null) {
        const pai = document.querySelector('#selected').parentElement;
        const selecionadoT = document.querySelector('#selected').innerText;

        if (pai.firstChild == selecionado) {
            alert('Esse item não consegue subir mais!');
        } else {
            const previousIrmaoT = document.querySelector('#selected').previousElementSibling.innerText;
            const previousIrmao = document.querySelector('#selected').previousElementSibling;
            const classprev = previousIrmao.className;
            const classSelect = selecionado.className;
            document.querySelector('#selected').innerText = previousIrmaoT;
            document.querySelector('#selected').previousElementSibling.innerText = selecionadoT;
            selecionado.className = classprev;
            previousIrmao.className = classSelect;
            previousIrmao.id = 'selected';
            selecionado.id = '';
        }
    }
}

function desce() {
    const selecionado = document.querySelector('#selected');

    if (selecionado !== null) {

        const pai = document.querySelector('#selected').parentElement;
        const selecionadoT = document.querySelector('#selected').innerText;

        if (pai.lastChild == selecionado) {
            alert('Esse item não consegue descer mais!');
        } else {
            const proxIrmaoT = document.querySelector('#selected').nextElementSibling.innerText;
            const proxIrmao = document.querySelector('#selected').nextElementSibling;
            const classprox = proxIrmao.className;
            const classSelect = selecionado.className;
            document.querySelector('#selected').innerText = proxIrmaoT;
            document.querySelector('#selected').nextElementSibling.innerText = selecionadoT;
            selecionado.className = classprox;
            proxIrmao.className = classSelect;
            proxIrmao.id = 'selected';
            selecionado.id = '';
        }
    }
}

const botaoRemoveSelecionado = document.getElementById('remover-selecionado');
botaoRemoveSelecionado.addEventListener('click', removeSelecionado);

function removeSelecionado() {
    let apagar = document.getElementById('selected');
    apagar.remove();
}