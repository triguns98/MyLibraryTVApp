var selectedElement;

$(document).ready(() => {
    let selectRowIndex = 0;
    let selectColumnIndex = 0;

    let selectables = [];
    let rows = document.querySelectorAll('.selectable-row');
    
    rows.forEach((s) => {
        let children = [];
        s.querySelectorAll('.selectable').forEach(e => {
            const selectable = {
                elem: e,
                selected: false
            }
            children.push(selectable);
        })

        let row = {
            elem: s,
            selected : false,
            children: children
        };

        selectables.push(row);
    });

    function navigate(direction) {
        if (direction === 'ArrowUp' || direction === 'ArrowDown') {
            if (direction === 'ArrowUp')
                selectRowIndex = Math.max(selectRowIndex -1 , 0);
            else
                selectRowIndex = Math.min(selectRowIndex + 1, selectables.length -1 );
            unselectAllElements();
            selectables[selectRowIndex].selected = true;
            selectables[selectRowIndex].children[0].elem.classList.add('selected');
            selectedElement = selectables[selectRowIndex].children[0];
        }

        if (direction === 'ArrowRight' || direction === 'ArrowLeft') {
            const selectableRow = selectables[selectRowIndex];
            if (selectableRow) 
                if (selectableRow.children){
                    if (direction === 'ArrowLeft')
                        selectColumnIndex = Math.max(selectColumnIndex -1 , 0);
                    else
                        selectColumnIndex = Math.min(selectColumnIndex + 1, selectableRow.children.length -1);
                    
                    unselectAllElements();

                    const child = selectableRow.children[selectColumnIndex];
                    child.selected = true;
                    child.elem.classList.add('selected');
                    selectedElement = child.elem;
                }
        }

    }

    function unselectAllElements() {
        selectables.forEach(s => {
            s.selected = false;
            if (s.children){
                s.children.forEach(e => {
                    e.selected = false;
                    e.elem.classList.remove('selected');
                })
            }
        });
    }
    

    window.addEventListener('keydown', (e) => {
        if (window.event) {
            navigate(e.key);
        }
    });
});


function getSelectedElement() {
    return selectedElement;
}