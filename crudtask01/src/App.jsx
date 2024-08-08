import { useState, useEffect} from 'react'


function App() {
  const [data, setdata] = useState([]);
  const [title, settitle] = useState('');
  const [body, setbody] = useState('');
  const [id, setid] = useState(0);
  const [isupdate, setisupdate] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/posts')
    .then((response) => {
      if(!response.ok) {
        throw new error('neetwork response was not ok');
      }
      return response.json()
    })
    .then((data) => {
      setdata(data);
    })
  }, []);


  const handleDelete = (id) => {
    if(id > 0) {
      const dt = data.filter((item) => item.id !== id);
      setdata(dt);
    }
  }

  const handleEdit = (id) => {
     const dt = data.filter((item) => item.id === id);
     if(dt !== undefined) {

      setisupdate(true);
      settitle(dt[0].title);
      setbody(dt[0].body);
      setid(id);
     }
  }

  const handleSave = (e) => {
    let error = '';
    if(title === "") {
      error += "title is required, ";
    } else if(body === "") {
      error += "body is required";
    }

    if(error === "") {
      e.preventDefault();
      const dt = [...data];
      const newObject = {
        id: data.length + 1,
        title: title,
        body: body,
      }
      dt.push(newObject);
      setdata(dt);
    }
    else {
      alert(error);
    }
    
  }

  const handleClear = () => {
      settitle('');
      setbody('');
      setid(0);
      setisupdate(false);
  }

  const handleUpdate = () => {
    const index = data.map((item) => {
      return item.id;
    }).indexOf(id);

    const dt = [...data];

    dt[index].title = title;
    dt[index].body = body;
    
    setdata(dt);
    handleClear();
  }

  return (
    <div className='App'>

      <div className='flex justify-center mt-3 mb-7'>
          <div className='mr-9'>
            <label className='mr-7'>Title:
             <input value={title} type="form" style={{background: '#f2f2f2'}}  className="p-2 rounded-lg" placeholder='write title here...' onChange={(e) => settitle(e.target.value)} />
            </label>
          </div>
          <div>
            <label className='mr-7'>Body:
             <input value={body} type="form" style={{background: '#f2f2f2'}} className="p-2 rounded-lg" placeholder='write body here...' onChange={(e) => setbody(e.target.value)}/>
            </label>
          </div>
          <div>
            {
              !isupdate ?
              <button onClick={(e) => handleSave(e)} className='bg-blue-600 text-white rounded-lg p-2 ml-4 mr-2'>Save</button>
              :
              <button onClick={(e) => handleUpdate()} className='bg-green-600 text-white rounded-lg p-2 ml-4 mr-2'>update</button>
            }
         
          <button onClick={(e) => handleClear()} className='bg-red-600 text-white rounded-lg p-1'>Clear</button>
          </div>
      </div>
      
      <table className='w-full'>
        <thead className='bg-gray-50 border-gray-200'>
          <th className='px-4 py-2 border-b border-gray-200 bg-gray-50'>userId</th>
          <th className='px-4 py-2 border-b border-gray-200 bg-gray-50'>Id</th>
          <th className='px-4 py-2 border-b border-gray-200 bg-gray-50'>Title</th>
          <th className='px-4 py-2 border-b border-gray-200 bg-gray-50'>body</th>
        </thead>
        <tbody className='border-black'>
          {
            data.map((item, index) => {
              return(
                <tr key={index}>
                  <td className='px-4 py-2 border-b border-l border-gray-200'>{index + 1}</td>
                  <td className='px-4 py-2 border-b border-l border-gray-200'>{item.id}</td>
                  <td className='px-4 py-2 border-b border-l border-gray-200'>{item.title}</td>
                  <td className='px-4 py-2 border-b border-l border-gray-200'>{item.body}</td>
                  <td className='flex border-l border-gray-200'>
                    <button onClick={(e) => handleDelete(item.id)} className='bg-red-600 text-white rounded-lg p-2 mr-2 mt-1'>Delete</button>
                    <button onClick={(e) => handleEdit(item.id)} className='bg-blue-600 text-white rounded-lg p-2 mr-1 mt-1'>Edit</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
