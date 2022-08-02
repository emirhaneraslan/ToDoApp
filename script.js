const yeniGorev = document.querySelector('.input-gorev')
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle')
const gorevListesi = document.querySelector('.gorev-listesi')


yeniGorevEkleBtn.addEventListener('click',gorevEkle)
gorevListesi.addEventListener('click',gorevSilTamamla)
//var olan bütün dom yapısı yüklendikten sonra bunu çağır dedik
document.addEventListener('DOMContentLoaded', localStorageOku)

function gorevSilTamamla (e) {

    const tiklaninlanEleman = e.target

    if (tiklaninlanEleman.classList.contains('gorev-btn-tamamlandi')) {
        console.log('checked tıklandı');
        //toggle yoksa ekle varsa sil demek
        tiklaninlanEleman.parentElement.classList.toggle('gorev-tamamlandi')
    }
    if(tiklaninlanEleman.classList.contains('gorev-btn-sil')) {
        
        tiklaninlanEleman.parentElement.classList.toggle('kaybol')
        console.log('sil tıklandı');

        const sililinecekGorev=tiklaninlanEleman.parentElement.children[0].innerText
        localStorageSil(sililinecekGorev)

        tiklaninlanEleman.parentElement.addEventListener('transitionend', function(){
            tiklaninlanEleman.parentElement.remove()
        })
    }

}

function gorevEkle (e) {
    e.preventDefault();

    gorevItemOlustur(yeniGorev.value)

    //localstorage kaydet
     localStorageKaydet(yeniGorev.value)
     
 
         yeniGorev.value=''
}

function localStorageKaydet (yeniGorev) {
    
    let gorevler

    if (localStorage.getItem('gorevler')===null) {
        gorevler = []
    }else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    gorevler.push(yeniGorev)
    localStorage.setItem('gorevler',JSON.stringify(gorevler))


}

function localStorageOku () {
    let gorevler

    if (localStorage.getItem('gorevler')===null) {
        gorevler = []
    }else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }

    gorevler.forEach(gorev => {
        gorevItemOlustur(gorev)
    });
}

function gorevItemOlustur (gorev) {
     //div oluşturma
     const gorevDiv= document.createElement('div')
     gorevDiv.classList.add('gorev-item')
 
     //li oluşturma
     const gorevLi = document.createElement('li')
     gorevLi.classList.add('gorev-tanim')
     gorevLi.innerText= gorev
     gorevDiv.appendChild(gorevLi)
 
     //tamamlandı butonu ekle
     const gorevTamamBtn = document.createElement('button')
     gorevTamamBtn.classList.add('gorev-btn')
     gorevTamamBtn.classList.add('gorev-btn-tamamlandi')
     gorevTamamBtn.innerHTML= `<i class="far fa-check-square"></i>`
     gorevDiv.appendChild(gorevTamamBtn)
 
     //sil butonu ekle
     const gorevSilBtn = document.createElement('button')
     gorevSilBtn.classList.add('gorev-btn')
     gorevSilBtn.classList.add('gorev-btn-sil')
     gorevSilBtn.innerHTML= `<i class="far fa-trash-alt"></i>`
     gorevDiv.appendChild(gorevSilBtn)
 
     //ul'ye oluşturduğumuz divi ekleyelim
     gorevListesi.appendChild(gorevDiv)
 
}

function localStorageSil (gorev) {

    let gorevler

    if (localStorage.getItem('gorevler')===null) {
        gorevler = []
    }else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'))
    }


    //splice ile item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev)
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1)

    localStorage.setItem('gorevler',JSON.stringify(gorevler))
}