

let arrInput = document.querySelector('.arrInput');
let genrateArr = document.querySelector('.genrateBtn');
let displayArr =document.querySelector('.arrDisplay');
let sortingContainer =document.querySelector('.sortingContainer');
let sortBtn = document.querySelector('.sortBtn');
let container = document.querySelector('.container');
let itrContainer = document.querySelector('.iterationContainer');
let selectAlgo = document.querySelector('#selectTech');
let bottom = document.querySelector('.bottom');
let algoHeadding = document.querySelector('.detailsHeading');
let algoName = document.querySelector('.algoName');
let bestTime = document.querySelector('.bestTime');
let avgTime = document.querySelector('.avgTime');
let worstTime = document.querySelector('.worstTime');
let worstSpace = document.querySelector('.worstSpace');
let keyPoint = document.querySelector('.keyPoint');
let homePage = document.querySelector('.homePage');
let sortingSection = document.querySelector('.sortingSection');
let right_bottom = document.querySelector('.right_bottom');
let content = document.querySelector('.content');
let sortingOverlay = document.querySelector('.sortingOverlay');
let searchingOverlay = document.querySelector('.searchingOverlay');


//Genrating Array from Input
genrateArr.addEventListener('click',()=>{

    let str =arrInput.value;
    if(str === ''){
        toastr.error("Please enter some values!");
        return;
        // add validation
    }
    sortingOverlay.style.display='none';
    displayArr.innerHTML='';
    sortingContainer.innerHTML='';
    itrContainer.innerHTML='';
    let arr =str.split(' ');
    // console.log(arr);
    // console.log(typeof(str));
    arr.forEach(element => {
        if(element === ''){
            console.log("space found");
            arrInput.setCustomValidity('Space found in the array.');
            return;
        }
        
        let ele =document.createElement('div');
        
            ele.classList.add('small-div');
            ele.innerHTML = element
            displayArr.appendChild(ele);
        
    });
    console.log(arr);
})
    
    //bubble sorting
    async function bubbleSorting() {
        
        sortingContainer.innerHTML = displayArr.innerHTML;
        let divArr = sortingContainer.querySelectorAll('.small-div');
        let count =1;
        let size = divArr.length;
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - i - 1; j++) {
                if (parseInt(divArr[j].innerHTML) > parseInt(divArr[j + 1].innerHTML)) {
                    const coodJ = divArr[j].offsetLeft;
                    const coodJ1 = divArr[j+1].offsetLeft;
                    divArr[j].style.backgroundColor='red';
                    divArr[j + 1].style.backgroundColor='red';
                    function updateCSSVariables( xi,xj) {
                        container.style.setProperty('--UpRight-x', `${xj-xi}px`);
                        container.style.setProperty('--DownLeft-x', `${-xj + xi}px`);
                        // console.log(xi ,xj);
                    }
                    
                    updateCSSVariables( coodJ,coodJ1);
                    // Swap animation for divArr[j] moving up and right, and divArr[j + 1] moving down and left
                    divArr[j].style.animation = 'moveUpRight 2s ease-in-out ';
                    divArr[j + 1].style.animation = 'moveDownLeft  2s ease-in-out ';
                    // Delay for animation to finish
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    // swapping
                    let temp = divArr[j].innerHTML;
                    divArr[j].innerHTML = divArr[j+1 ].innerHTML;
                    divArr[j+1].innerHTML = temp;
                    
                    // Reset animations after swapping
                    divArr[j].style.animation = '';
                    divArr[j + 1].style.animation = '';

                    //Adding to ittration 
                    let div =document.createElement('div');
                    let h3 =document.createElement('h3');
                    h3.textContent = `Iteration No ${count}`;
                    count++;
                    div.appendChild(h3);
                    div.innerHTML += sortingContainer.innerHTML;
                    itrContainer.appendChild(div);

                    // Reset color
                    divArr[j].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
                    divArr[j +1].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
                }
            }
        }
    }
    // console.log(count);
    async function selectionSort() {
        console.log("Selection Sorting");
        sortingContainer.innerHTML = displayArr.innerHTML;
        let divArr = sortingContainer.querySelectorAll('.small-div');
        let size = divArr.length;
    
        for (let i = 0, count = 1; i < size - 1; i++, count++) {
            let minIndex = i;
            for (let j = i + 1; j < size; j++) {
                if (parseInt(divArr[j].innerHTML) < parseInt(divArr[minIndex].innerHTML)) {
                    minIndex = j;
                }
            }
            
            if (minIndex !== i) {
                const coodI = divArr[i].offsetLeft;
                const coodMin = divArr[minIndex].offsetLeft;
                divArr[i].style.backgroundColor='red';
                divArr[minIndex].style.backgroundColor='red';
                function updateCSSVariables(xi, xMin) {
                    container.style.setProperty('--UpRight-x', `${xMin - xi}px`);
                    container.style.setProperty('--DownLeft-x', `${-xMin + xi}px`);
                    console.log(xi, xMin);
                }
    
                updateCSSVariables(coodI, coodMin);
                // Swap animation for divArr[i] moving up and right, and divArr[minIndex] moving down and left
                divArr[i].style.animation = 'moveUpRight 2s ease-in-out ';
                divArr[minIndex].style.animation = 'moveDownLeft  2s ease-in-out ';
                // Delay for animation to finish
                await new Promise(resolve => setTimeout(resolve, 2000));
                // swapping
                let temp = divArr[i].innerHTML;
                divArr[i].innerHTML = divArr[minIndex].innerHTML;
                divArr[minIndex].innerHTML = temp;
    
                // Reset animations after swapping
                divArr[i].style.animation = '';
                divArr[minIndex].style.animation = '';
                //Adding to iteration 
                let div = document.createElement('div');
                let h3 = document.createElement('h3');
                h3.textContent = `Iteration No ${count}`;
                div.appendChild(h3);
                div.innerHTML += sortingContainer.innerHTML;
                itrContainer.appendChild(div);
    
                // Reset color
                divArr[i].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
                divArr[minIndex].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
            }
        }
    }
    
    //Quick sorting
    let count =1;
    async function quickSort(arr, left = 0, right = arr.length - 1) {
        
        if (left >= right) return;
    
        let pivot = arr[Math.floor((right + left) / 2)].innerHTML;
        let index = await partition(arr, left, right, pivot);
    
        await quickSort(arr, left, index - 1);
        await quickSort(arr, index, right);
    }
    
    async function partition(arr, left, right, pivot) {
        // count =1
        while (left <= right) {
            while (parseInt(arr[left].innerHTML) < parseInt(pivot)) left++;
            while (parseInt(arr[right].innerHTML) > parseInt(pivot)) right--;
    
            if (left <= right) {
                await swap(arr, left, right);
                left++;
                right--;
            }
        }
        return left;
    }
    
    async function swap(arr, leftIndex, rightIndex) {
        
        const leftDiv = arr[leftIndex];
        const rightDiv = arr[rightIndex];
        
        leftDiv.style.backgroundColor = 'red';
        rightDiv.style.backgroundColor = 'red';
        // console.log(leftIndex,'  ',rightIndex);
        
        if(leftIndex != rightIndex){
            const coodLeft = leftDiv.offsetLeft;
            const coodRight = rightDiv.offsetLeft;
            function updateCSSVariables(xLeft, xRight) {
            container.style.setProperty('--UpRight-x', `${xRight - xLeft}px`);
            container.style.setProperty('--DownLeft-x', `${-xRight + xLeft}px`);
            }

            updateCSSVariables(coodLeft, coodRight);

            // Swap animation for leftDiv moving up and right, and rightDiv moving down and left
        
            leftDiv.style.animation = 'moveUpRight 2s ease-in-out forwards';
            rightDiv.style.animation = 'moveDownLeft 2s ease-in-out forwards';
        }
        else{
            // console.log("not equal wali condition")
            rightDiv.style.animation = 'moveUpRotate 2s ease-in-out forwards';
            leftDiv.style.animation = 'moveUpRotate 2s ease-in-out forwards';

        }
    
        // Delay for animation to finish
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        // Swap elements in the array and update HTML
        let temp = leftDiv.innerHTML;
        leftDiv.innerHTML = rightDiv.innerHTML;
        rightDiv.innerHTML = temp;
    
        // Reset animations after swapping
        leftDiv.style.animation = '';
        rightDiv.style.animation = '';

            // ittration box
                    let div =document.createElement('div');
                    let h3 =document.createElement('h3');
                    h3.textContent = `Iteration No ${count}`;
                    count++;
                    div.appendChild(h3);
                    div.innerHTML += sortingContainer.innerHTML;
                    itrContainer.appendChild(div);
        // reset color
        leftDiv.style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
        rightDiv.style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
    }
    //insertion sort
    async function insertionSort() { 

        let divArr = sortingContainer.querySelectorAll('.small-div');
        let size = divArr.length;
    
        for (let i = 1; i < size; i++) {
            let key = parseInt(divArr[i].innerHTML);
            let j = i - 1;
    
            while (j >= 0 && parseInt(divArr[j].innerHTML) > key) {
                const coodJ = divArr[j].offsetLeft;
                const coodJNext = divArr[j + 1].offsetLeft;
    
                function updateCSSVariables(xJ, xJNext) {
                    container.style.setProperty('--UpRight-x', `${xJNext - xJ}px`);
                    container.style.setProperty('--DownLeft-x', `${-xJNext + xJ}px`);
                }
    
                updateCSSVariables(coodJ, coodJNext);
    
                divArr[j].style.animation = 'moveUpRight 2s ease-in-out ';
                divArr[j + 1].style.animation = 'moveDownLeft  2s ease-in-out ';
                divArr[j].style.backgroundColor = 'red'; // Highlighting elements being compared
                divArr[j + 1].style.backgroundColor = 'red';
                await new Promise(resolve => setTimeout(resolve, 2000));
    
                divArr[j + 1].innerHTML = divArr[j].innerHTML;
    
                divArr[j].style.animation = '';
                divArr[j + 1].style.animation = '';
                
                divArr[j].style.backgroundColor = `rgb(${102}, ${70}, ${217})`; // Resetting color
                divArr[j + 1].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
                
                j--;
                divArr[j + 1].innerHTML = key.toString();
            }
            
            // Adding iteration display
            let div = document.createElement('div');
            let h3 = document.createElement('h3');
            h3.textContent = `Iteration No ${i}`;
            div.appendChild(h3);
            div.innerHTML += sortingContainer.innerHTML;
            itrContainer.appendChild(div);
            
        }
    }
    
    
    
    
    //calling function
        selectAlgo.addEventListener('change', (event) => {
           
            sortingContainer.innerHTML='';
            let selectedValue=event.target.value;
            itrContainer.innerHTML='';
            
            
        });
        sortBtn.addEventListener('click', async () => {
            const selectedValue = selectAlgo.value;
            if(selectedValue === ''){
                toastr.error("Please select the method!");
                return;
                // add validation
            }
            else if(selectedValue !== '' && sortingOverlay.style.display !== 'none'){
                // alert("plse genrate the dataset");
                toastr.error("Please genrate the array!");
                return;
            }
            algoHeadding.innerHTML='';
            algoName.innerHTML='';
            keyPoint.innerHTML='';
            content.innerHTML='';
            // bottom.style.display = 'inline-block';
            bottom.style.visibility = 'visible';
            // console.log(selectedValue);
            itrContainer.innerHTML='';
            if(selectedValue === 'Ns'){
                console.log("normal Sorting");
                algoHeadding.innerHTML="Linear sort";
                algoName.innerHTML="Linear sort";
                keyPoint.innerHTML +='Key Point about Linear sort';
                content.innerHTML =`<ul>
                    <li>
                        Simple comparison-based sorting.
                    </li>
                    <li>
                    Quadratic time complexity.
                    </li>
                    <li>
                        In-place sorting with minimal memory usage.
                    </li>
                </ul>`
                bestTime.innerHTML=`O(n)`;
                avgTime.innerHTML=`O(n<sup>2</sup>)`;
                worstTime.innerHTML=`O(n<sup>2</sup>)`;
                worstSpace.innerHTML=`O(1)`;
                await normalSorting();
            }
            else if(selectedValue === 'Bs'){
                console.log("Bubble sorting");
                algoHeadding.innerHTML="Bubble sort";
                algoName.innerHTML="bubble sort";
                keyPoint.innerHTML ='Key Point about Bubble sort';
                content.innerHTML +=
                `<ul>
                <li>
                    Simple pairwise comparison swaps adjacent elements until fully sorted.
                </li>
                <li>
                    Quadratic time complexity makes it inefficient for large datasets.
                </li>
                <li>
                    In-place sorting with minimal memory usage for small datasets.
                </li>
                 </ul>`
                bestTime.innerHTML=`O(n)`;
                avgTime.innerHTML=`O(n<sup>2</sup>)`;
                worstTime.innerHTML=`O(n<sup>2</sup>)`;
                worstSpace.innerHTML=`O(1)`;
                await bubbleSorting();
            }
            else if(selectedValue === 'Qs'){
                console.log("Quick sorting");
                count=1;
                sortingContainer.innerHTML = displayArr.innerHTML;
                let divArr = sortingContainer.querySelectorAll('.small-div');
                console.log("Quick sorting");
                algoHeadding.innerHTML="Quick sort";
                algoName.innerHTML="quick sort";
                keyPoint.innerHTML +='Key Point about Quick sort';
                content.innerHTML +=
                `<ul>
                <li>
                    Efficient divide-and-conquer strategy for sorting large datasets.
                </li>
                <li>
                    Recursive partitioning places elements correctly in subarrays.
                </li>
                <li>
                    Average-case time complexity of O(n log n) for fast sorting.
                </li>
                 </ul>`
                bestTime.innerHTML=`O(n log n)`;
                avgTime.innerHTML=`O(n log n)`;
                worstTime.innerHTML=`O(n<sup>2</sup>)`;
                worstSpace.innerHTML=`O(n)`;
                await quickSort(divArr);
            }
            else if(selectedValue === 'ss'){
                console.log("Selection sorting");
                sortingContainer.innerHTML = displayArr.innerHTML;
                let divArr = sortingContainer.querySelectorAll('.small-div');
                console.log("Selection sorting");
                algoHeadding.innerHTML="Selection sort";
                algoName.innerHTML="Selection sort";
                keyPoint.innerHTML +='Key Point about Selection sort';
                content.innerHTML +=
                `<ul>
                <li>
                Selects minimum, swaps with current, iterates through array.
                </li>
                <li>
                Quadratic time complexity, less efficient for large datasets.
                </li>
                <li>
                Simple, but outperformed by more advanced sorting algorithms.
                </li>
                 </ul>`
                bestTime.innerHTML=`O(n log n)`;
                avgTime.innerHTML=`O(n log n)`;
                worstTime.innerHTML=`O(n<sup>2</sup>)`;
                worstSpace.innerHTML=`O(n)`;
                await selectionSort();
            }
            else if(selectedValue === 'Is'){
                // console.log("Insertion sorting");
                sortingContainer.innerHTML = displayArr.innerHTML;
                let divArr = sortingContainer.querySelectorAll('.small-div');
                console.log("Selection sorting");
                algoHeadding.innerHTML="Insertion sort";
                algoName.innerHTML="Insertion sort";
                keyPoint.innerHTML +='Key Point about Insertion sort';
                content.innerHTML +=
                `<ul>
                <li>
                    Efficient for small lists, especially nearly sorted ones.
                </li>
                <li>
                    Sorts elements in the original array without extra memory.
                </li>
                <li>
                    Maintains the order of equal elements.
                </li>
                 </ul>`
                bestTime.innerHTML=`O(n)`;
                avgTime.innerHTML=`O(n<sup>2</sup>)`;
                worstTime.innerHTML=`O(n<sup>2</sup>)`;
                worstSpace.innerHTML=`O(1)`;
                await insertionSort();
            }
        });
    

//Searching Section
let searchingSection = document.querySelector('.searchingSection');
let searchBottom = document.querySelector('.searchBottom');
let searchGenrate = document.querySelector('#searchGenrate');
const showArray = document.getElementById('showArray');
const searchBtn = document.getElementById('searchBtn');
const searchMethod = document.getElementById('searchMethod');
const inputArray = document.querySelector('.searchingSection .arrInput');
const searchItr = document.querySelector('.SiterationContainer');
const searchingContainer = document.querySelector('.searchingContainer');
const searchingHeading =document.querySelector('.SearchingHeading');
let algoName2 = document.querySelector('.algoName2');
let bestTime2 = document.querySelector('.bestTime2');
let avgTime2 = document.querySelector('.avgTime2');
let worstTime2 = document.querySelector('.worstTime2');
let worstSpace2 = document.querySelector('.worstSpace2');
let keyPoint2 = document.querySelector('.keyPoint2');
let content2 = document.querySelector('.content2');
let valueInput = document.querySelector('.valueInput');
let findOverLay = document.querySelector('.findOverLay');
let messageBox = document.querySelector('.messageBox');
let overLayMsg = document.querySelector('.overLayMsg');
let overLayidx = document.querySelector('.overLayidx');
// console.log(searchValue);
searchGenrate.addEventListener('click', () => {
    const inputValue = inputArray.value.trim();
    if(inputValue === ''){
        // alert("Plse enter the numbers");
        toastr.error("Please enter some values!");
        return;
        // add validation
    }
    showArray.innerHTML = '';
    searchingOverlay.style.display='none';
    
    const arr = inputValue.split(' ');

    arr.forEach(element => {
        if (element === '') {
            console.log("Space found in the array.");
            // inputArray.setCustomValidity('Space found in the array.');
            return;
        }

        const ele = document.createElement('div');
        ele.classList.add('small-div2');
        ele.innerHTML = element;
        showArray.appendChild(ele); 
    });
});
searchBtn.addEventListener('click', async ()=>{
    const searchingMethod = searchMethod.value;
    const searchValue =valueInput.value;
    if(searchingMethod === ''){
        // alert("Select a method");
        toastr.error("Please enter the method!");

        // add validation
    }
    else if(searchingMethod != '' && searchingOverlay.style.display !== 'none'){
        // alert("Plse enter the number!");
        toastr.error("Please genrate the array!");
        return;
    }
    else if(searchingMethod != '' && searchValue === ''){
        toastr.error("Please enter the target value!");
        return;

    }

    searchItr.innerHTML=''
    searchingContainer.innerHTML='';
    searchingHeading.innerHTML='';
    keyPoint2.innerHTML='';
    content2.innerHTML='';
    searchBottom.style.visibility = 'hidden';
    
    console.log('hnji andr hu abhi btn ke or method hai',searchingMethod,"or value hai",searchValue);
    
    messageBox.innerHTML='';
    
    if(searchingMethod === 'LS'){
        searchBottom.style.visibility = 'visible';
        console.log("Linear Sorting");
        searchingHeading.innerHTML="Linear seraching";
                algoName2.innerHTML="Linear search";
                keyPoint2.innerHTML +='Key Point about Linear search';
                content2.innerHTML =`<ul>
                    <li>
                        Simple comparison-based sorting.
                    </li>
                    <li>
                    Quadratic time complexity.
                    </li>
                    <li>
                        In-place sorting with minimal memory usage.
                    </li>
                </ul>`
                bestTime2.innerHTML=`O(n)`;
                avgTime2.innerHTML=`O(n<sup>2</sup>)`;
                worstTime2.innerHTML=`O(n<sup>2</sup>)`;
                worstSpace2.innerHTML=`O(1)`;
        await linearSearching();
    }
    else if(searchingMethod === 'BS'){

        //sorted or unsorted
        const sorted = findSorted();
        function findSorted(){
            console.log("binary Sorting");
            let divArr = showArray.querySelectorAll('.small-div2');
            let arrSize = divArr.length;
            console.log('size of array  is' ,arrSize,divArr);
            for (let i = 1; i < arrSize; i++) {
                console.log(parseInt(divArr[i].innerHTML));
                if (parseInt(divArr[i].innerHTML) < parseInt(divArr[i - 1].innerHTML)) {
                    console.log('for ke minus wali condition k eandr hu bhai ji');
                    return -1;
                }
            }
            
            return 1;
        }
        // console.log(sorted);
        if(sorted === 1){
            console.log("Hojayegi bhyi sorting");
            searchBottom.style.visibility = 'visible';
            searchingHeading.innerHTML="Binary seraching";
            algoName2.innerHTML="Binary search";
            keyPoint2.innerHTML +='Key Point about Binary search';
            content2.innerHTML =`<ul>
                <li>
                Efficient: halves search space, logarithmic time complexity O(log n).
                </li>
                <li>
                Sorted data: prerequisite for accurate results in binary search.
                </li>
                <li>
                Divide and conquer: compares middle element, halves search interval.
                </li>
            </ul>`
            bestTime2.innerHTML=`O(n)`;
            avgTime2.innerHTML=`O(n<sup>2</sup>)`;
            worstTime2.innerHTML=`O(n<sup>2</sup>)`;
            worstSpace2.innerHTML=`O(1)`;
            await binarySearching();
            //call the function 
        }else{
            //genrate a msg 
            heading =document.createElement('h3');
            subHeading =document.createElement('span');
            heading.innerHTML = 'Array is unsorted'
            // heading.classList.add('')
            subHeading.innerHTML = 'Do you want to sort the array ?';
            messageBox.appendChild(heading);
            messageBox.appendChild(subHeading);

            let div = document.createElement('div');
            let sortArr = document.createElement('button');
            sortArr.innerHTML = 'Sort';
            
            div.appendChild(sortArr);
            let lSort = document.createElement('button');
            lSort.innerHTML = 'Linear sort';
            
            div.appendChild(lSort);
            messageBox.appendChild(div);
            openOverLay();
            sortArr.addEventListener('click',()=>{
                let divArr = document.querySelectorAll(".small-div2");
                let intArr = [];
                
                divArr.forEach(ele => {
                    let innerHTML = ele.innerHTML.trim();
                    let num = parseInt(innerHTML);
                    if (!isNaN(num)) {
                        intArr.push(num);
                    }
                });
                //sorting the array
                intArr.sort((a,b)=> a-b);
                console.log(intArr);
                //showArray input
                let i=0;
                divArr.forEach( ele =>{
                    // console.log(ele.innerHTML);
                    ele.innerHTML = intArr[i++];
                    
                })
            })
            lSort.addEventListener('click',()=>{
                searchMethod.value = 'LS'
            })
        }
    }
})

async function linearSearching() {
    searchingContainer.innerHTML = showArray.innerHTML;
    let divArr = searchingContainer.querySelectorAll('.small-div2');
    let arrSize = divArr.length;
    let searchValue = parseInt(valueInput.value); 
    console.log(searchValue)
    let found = false;
    let count = 1;
    let idx =findIdx();
    function findIdx(){
        for(let i=0;i<arrSize;i++){
            // console.log(parseInt(divArr[i].innerHTML),'hnjii');
            if(parseInt(divArr[i].innerHTML) === searchValue)return i;
            // else return -1;
        }
    }
    for (let i = 0; i < arrSize; i++) {
        divArr[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 500));
        //Adding to ittration 
        let div =document.createElement('div');
        let h3 =document.createElement('h3');
        h3.textContent = `Iteration No ${count}`;
        count++;
        div.appendChild(h3);
        div.innerHTML += searchingContainer.innerHTML;
        searchItr.appendChild(div);
    
        if (parseInt(divArr[i].innerHTML) === searchValue) {
            found = true;
            break;
        }


        divArr[i].style.backgroundColor = `rgb(102, 70, 217)`;
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    if (found) {
       

        heading =document.createElement('h3');
        subHeading =document.createElement('span');
        heading.innerHTML = 'Element Found';
        subHeading.innerHTML =`${searchValue} found at index ${idx}`
        messageBox.appendChild(heading);
        messageBox.appendChild(subHeading);
        findOverLay.appendChild(messageBox);
        openOverLay();
    } else {

        console.log(`Element ${searchValue} not found.`);

        heading =document.createElement('h3');
        subHeading =document.createElement('span');
        heading.innerHTML = 'Element Not Found';
        subHeading.innerHTML =`Element ${searchValue} not found`
        messageBox.appendChild(heading);
        messageBox.appendChild(subHeading);
        findOverLay.appendChild(messageBox);
        openOverLay();
    }
}

async function binarySearching() {
    searchingContainer.innerHTML = showArray.innerHTML;
    let divArr = searchingContainer.querySelectorAll('.small-div2');
    let arrSize = divArr.length;
    let searchValue = parseInt(valueInput.value); 
    console.log(searchValue)
    let found = false;
    let count = 1;
    let idx = await findIdx(0, arrSize - 1); // Initial call to async binary search function

    async function findIdx(start, end) {
        while (start <= end) {
            let mid = Math.floor((start + end) / 2);
            console.log("mid idx ", mid);
            let midValue = parseInt(divArr[mid].innerHTML);
            divArr[mid].style.backgroundColor = 'red';

            await new Promise(resolve => setTimeout(resolve, 500));
            //Adding to ittration 
            let div = document.createElement('div');
            let h3 = document.createElement('h3');
            h3.textContent = `Iteration No ${count}`;
            count++;
            div.appendChild(h3);
            div.innerHTML += searchingContainer.innerHTML;
            searchItr.appendChild(div);
            if (midValue === searchValue) {
                found = true;
                return mid; 
            } else if (midValue < searchValue) {
                start = mid + 1; // right half
            } else {
                end = mid - 1; // left half
            }
            divArr[mid].style.backgroundColor = `rgb(102, 70, 217)`;
            await new Promise(resolve => setTimeout(resolve, 500)); 
        }
        return -1; // Element not found
    }

    // for (let i = 0; i < arrSize; i++) {
    //     divArr[i].style.backgroundColor = 'red';
    //     await new Promise(resolve => setTimeout(resolve, 500));
    //     //Adding to ittration 
    //     let div = document.createElement('div');
    //     let h3 = document.createElement('h3');
    //     h3.textContent = `Iteration No ${count}`;
    //     count++;
    //     div.appendChild(h3);
    //     div.innerHTML += searchingContainer.innerHTML;
    //     searchItr.appendChild(div);

    //     if (parseInt(divArr[i].innerHTML) === searchValue) {
    //         found = true;
    //         break;
    //     }

    //     divArr[i].style.backgroundColor = `rgb(102, 70, 217)`;
    //     await new Promise(resolve => setTimeout(resolve, 500));
    // }

    if (found) {
        heading = document.createElement('h3');
        subHeading = document.createElement('span');
        heading.innerHTML = 'Element Found'
        subHeading.innerHTML = `${searchValue} found at index ${idx}`
        messageBox.innerHTML = '';
        messageBox.appendChild(heading);
        messageBox.appendChild(subHeading);
        openOverLay();
    } else {
        console.log(`Element ${searchValue} not found.`);

        heading =document.createElement('h3');
        subHeading =document.createElement('span');
        heading.innerHTML = 'Element Not Found';
        subHeading.innerHTML =`Element ${searchValue} not found`
        messageBox.appendChild(heading);
        messageBox.appendChild(subHeading);
        findOverLay.appendChild(messageBox);
        openOverLay();
    }
}

function openOverLay(){
    document.body.style.overflow = 'hidden';
    findOverLay.classList.add('openOverLay');
}
function closeOverLay(){
    document.body.style.overflow = 'auto';
    // document.body.style.overflow = 'hidden';
    findOverLay.classList.remove('openOverLay');
}

//overLay for sorting
// Get all the cards
const cards = document.querySelectorAll('.card');

// Add event listeners to each card for rotation 
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hovered'); 
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('hovered');
    });
});
//scroll
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

//Dsa section
let data_structure_input = document.querySelector('#data-structure-input');
let sizeOfArray = document.querySelector('#arrSize');
let arrValue = document.querySelector('#arrValue');
let outputDsa = document.querySelector('.outputDsa');
let DisplayArray = document.querySelector(".DisplayArray");
let DsaOverlay = document.querySelector(".DsaOverlay");
let idxForArr =0;
let stackSection = document.querySelector('.stackSection');
const rootStyles = getComputedStyle(document.documentElement);

let height = parseInt(rootStyles.getPropertyValue('--boxHeight')); 
let QSection = document.querySelector('.QSection');
const chotu = document.createElement('div');
const queueDisplay = document.createElement('div');
function genrateBlankArray(){
    let size = parseInt(sizeOfArray.value);
    console.log(size);
    for(let i = 0 ; i < size ; i++){
        let blankArr = document.createElement('div');
        blankArr.classList.add('small-div3');
        outputDsa.appendChild(blankArr);
    }
    sizeOfArray.value='';
}
function SelectDsa(){
    DsaOverlay.style.display='none';
    console.log(data_structure_input.value);
    DisplayArray.style.visibility = 'hidden';
    stackSection.style.visibility = 'hidden';
    QSection.style.visibility = 'hidden';
    // chotu.style.visibility='hidden';
    chotu.innerHTML="";
    queueDisplay.innerHTML="";
    document.documentElement.style.setProperty('--boxHeight', 40 + 'px');
    document.documentElement.style.setProperty('--boxWidth', 40 + 'px');
    // outputDsa.innerHTML="hnji";
    outputDsa.innerHTML='';
    // outputDsa.removeChild('chotu');
    console.log('delete output');
    if(data_structure_input.value === 'arr'){
        DisplayArray.style.visibility = 'visible';
    }
    else if(data_structure_input.value === 'stk'){
        // chotu.style.visibility='visible';
        height=parseInt(rootStyles.getPropertyValue('--boxHeight'));
        stackSection.style.visibility = 'visible';
        outputDsa.appendChild(chotu);
        chotu.classList.add('chotu');

        
    }
    else if(data_structure_input.value === 'que'){
        QSection.style.visibility = 'visible';
        outputDsa.appendChild(queueDisplay);
        queueDisplay.classList.add('queueDisplay');
        
    }
    
}

function addValueToArray(){
    //empty condition
    if(arrValue.value ===''){
        // alert("Plse Enter value");
        toastr.error("Please enter value!");
        return;
    }
    console.log('yes ');
    let blankArrBox = document.querySelectorAll('.small-div3');
    //overflow wali condition
    if(idxForArr >= blankArrBox.length){
        // alert("out of bound");
        toastr.error("Out of bound");
        arrValue.value='';
        return;
    }
    console.log(blankArrBox.length)
    
        blankArrBox[idxForArr].innerHTML = arrValue.value;
        idxForArr++;
        arrValue.value='';
}
//Stack code
document.addEventListener('DOMContentLoaded', () => {
    
    const stackContainer = document.querySelector('.outputDsa');
    const selectBox = document.querySelector('#selectBox');
    const pushBtn = document.querySelector('.dynamicBtn');
    const pushInput = document.querySelector('#pushInput');
    let stackOper = 'push';
    
    
    
    
    selectBox.addEventListener('change', () => {
        chotu.classList.add('chotu');
        stackOper = selectBox.value;
        if (stackOper === 'push') {
            pushBtn.innerHTML = 'Push';
            pushInput.style.display = 'block';
            console.log("push function");
        } else if (stackOper === 'pop') {
            console.log("pop function");
            pushBtn.innerHTML = 'Pop';
            pushInput.style.display = 'none';
        } else if (stackOper === 'peek') {
            pushBtn.innerHTML = 'Peek';
            pushInput.style.display = 'none';
            console.log("peek function");
        }
    });

    // const rootStyles = getComputedStyle(document.documentElement);
    // let height = parseInt(rootStyles.getPropertyValue('--boxHeight')); 
    pushBtn.addEventListener('click', () => {
        let selectOption = selectBox.value;
        let data = pushInput.value;
        
        

        if (selectOption === 'push' && data !== '') {
            
            let valueDiv = document.createElement('div');
            valueDiv.classList.add('value');
            valueDiv.textContent = data;
            // valueContainer.innerHTML=data;
            chotu.appendChild(valueDiv);
        
            height += 40; 
            document.documentElement.style.setProperty('--boxHeight', height + 'px');

            pushInput.value = '';
            // for(let i=0;i<chotuArr.length;i++){
            //     console.log(chotuArr[i]);
            // }
        }
        else if (selectOption === 'pop') {
            
            const values = chotu.querySelectorAll('.value');
            if (values.length > 0) {
                chotu.removeChild(values[values.length - 1]);
                height -= 40; 
                console.log(height);
                document.documentElement.style.setProperty('--boxHeight', height + 'px');
            } else {
                console.log('Stack is empty!');
                // alert('Stack is empty!');
                toastr.error("Stack is empty");
            }
        } else if (selectOption === 'peek') {
            const values = chotu.querySelectorAll('.value');
            if (values.length > 0) {
                for (let i = 0; i < values.length - 1; i++) {
                    values[i].classList.add('blur');  
                    setTimeout(() => {
                        values[i].classList.remove('blur');
                    }, 5000);  
                }
                console.log('Peeked value:', values[values.length - 1].textContent);
            } else {
                console.log('Stack is empty!');
                // alert('Stack is empty!');
                toastr.error('Stack is empty!');
            }
        }
        //for color
        let chotuArr = document.querySelectorAll('.value');
        for(let i=0;i<chotuArr.length;i++){
            // console.log(chotuArr[i]);
            chotuArr[i].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
            if(i == chotuArr.length-1){
                chotuArr[i].style.backgroundColor = 'red';

            }
        }
    });
});
//queue
document.addEventListener('DOMContentLoaded', () => {
    
    const stackContainer = document.querySelector('.outputDsa');
    const queueSelectBox = document.querySelector('#queueSelectBox');
    const QueueBtn = document.querySelector('.QueueBtn');
    const queueInput = document.querySelector('#queueInput');
    let stackOper = 'push';
    const rootStyles = getComputedStyle(document.documentElement);
    let width = parseInt(rootStyles.getPropertyValue('--boxWidth')); 
    
    queueSelectBox.addEventListener('change', () => {
        queueDisplay.classList.add('queueDisplay');
        console.log("Queue mea chnage");
        stackOper = queueSelectBox.value;
        if (stackOper === 'push') {
            width=
            QueueBtn.innerHTML = 'Enqueue';
            queueInput.style.display = 'block';
            console.log("push function");
        } else if (stackOper === 'pop') {
            console.log("pop function");
            QueueBtn.innerHTML = 'Dequeue';
            queueInput.style.display = 'none';
        } else if (stackOper === 'peek') {
            QueueBtn.innerHTML = 'Peek';
            queueInput.style.display = 'none';
            console.log("peek function");
        }
    });

    
    QueueBtn.addEventListener('click', () => {
        let selectOption = queueSelectBox.value;
        let data = queueInput.value;
        
        

        if (selectOption === 'push' && data !== '') {
            console.log("Queue pushing")
            let valueDiv = document.createElement('div');
            valueDiv.classList.add('Qvalue');
            valueDiv.textContent = data;
            queueDisplay.appendChild(valueDiv);
        
            width += 40; 
            document.documentElement.style.setProperty('--boxWidth', width + 'px');

            queueInput.value = '';
        }
        else if (selectOption === 'pop') {
            
            const Qvalues = queueDisplay.querySelectorAll('.Qvalue');
            console.log(Qvalues.length,'queue length');
            // for(let i =0;i<Qvalues.length;i++){

            // }
            if (Qvalues.length > 0) {
                queueDisplay.removeChild(Qvalues[0]);
                width -= 40; 
                console.log(width);
                document.documentElement.style.setProperty('--boxWidtht', width + 'px');
            } else {
                console.log('Queue is empty!');
                // alert('Queue is empty!');
                toastr.error("Queue is empty!");
            }
        } else if (selectOption === 'peek') {
            const Qvalues = queueDisplay.querySelectorAll('.Qvalue');
            if (Qvalues.length > 0) {
                for (let i = 0; i < Qvalues.length; i++) {
                    if(i==0){
                        continue;
                    }
                    Qvalues[i].classList.add('blur');  
                    setTimeout(() => {
                        Qvalues[i].classList.remove('blur');
                    }, 5000);  
                }
                console.log('Peeked value:', Qvalues[Qvalues.length - 1].textContent);
            } else {
                console.log('Queue is empty!');
                // alert('Queue is empty!');
                toastr.error("Queue is empty!");
            }
        }
        //for color
        let queueArr = document.querySelectorAll('.Qvalue');
        for(let i=0;i<queueArr.length;i++){
            // console.log(chotuArr[i]);
            queueArr[i].style.backgroundColor = `rgb(${102}, ${70}, ${217})`;
            if(i == 0){
                queueArr4[i].style.backgroundColor = 'red';
            }
        }
    });
});