/*
** 
 * 简单HashMap 
 *  
 */  
function HashMap(){  
    data={};  
    var size=0;  
    //清除所有的属性  
    this.clear=function(){  
         data={};  
    }  
      
    /** 
     * 判断key是否存在 
     * @param key 
     * @return Boolean  
     */  
    this.containsKey=function(){  
        return Boolean(arguments[0] in data);  
    }  
    /** 
     * 判断值是否存在 
     * @param value 
     * @return Boolean 
     */  
    this.containsValue=function(){  
        var str=data.toSource();  
        return str.indexOf(arguments[0])==-1 ? false: true;  
    }  
    /** 
     * 返回key对应的v 
     */  
    this.get=function(){  
        return data[arguments[0]];  
    }  
    /** 
     * 判断是否为空 
     * @return Boolean 
     */  
    this.isEmpty=function(){  
        return size==0? true:false;  
    }  
    /** 
     * 取出所有的key 
     * @return Array() 
     */  
    this.keySet=function(){  
        var arr=new Array();  
        for(var i in data){  
            arr.push(i);  
        }  
        return arr;  
    }  
    /** 
     * 将key，value放入对象 
     * @param key  
     * @param value 
     */  
    this.put=function(){  
        data[arguments[0]]=[arguments[1]];  
        if(!this.containsKey(arguments[0])){  
             size++;  
        }  
         
    }  
    /** 
     * 将另外一个HashMap 复制到此Map 
     * @param map 
     */  
    this.putAll=function(){  
        data=arguments[0].getData();  
    }  
    /** 
     * 删除key对应的value 
     * @param key 
     * @return value与 key 关联的旧值 
     */  
    this.remove=function(){  
        var o=this.get(arguments[0]);  
        if(o){  
            delete data[o];  
            return o;  
        }else{  
            return null;  
        }  
    }  
    /** 
     * 返回此HashMap的大小 
     * @reaturn Int 
     */  
    this.size=function(){  
        return size;  
    }  
    /** 
     * 返回此map所有的value集合 
     * @return Connections 
     */  
    this.values=function(){  
        var arr=new Array();  
        for (var i in data) {  
            arr.push(data[i])  
        }  
        return arr;  
    }  
    this.getData=function(){  
        return data;  
    }  
      
}  