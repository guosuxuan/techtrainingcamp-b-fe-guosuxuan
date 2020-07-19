const ajax = ( url,method,success) => {
	let ajax=new XMLHttpRequest();
	if(method==='get'){
		ajax.open(method,url);
		ajax.send();
	}

	ajax.onreadystatechange=function(){
		if(ajax.readyState===4&&ajax.status===200){
			success(JSON.parse(ajax.responseText))
		}
	}
}
export default ajax