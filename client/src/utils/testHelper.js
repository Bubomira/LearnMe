export const navigationMock = jest.fn();

export const changeAlert=(btn,message)=>{
    window.alert = jest.fn(()=>{
       btn.textContent=message
    });
  }

export const navigationMockingFunction=()=>jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
   useNavigate: () => navigationMock,
 }));

 export const serviceMockingFunction=(mockPath,mockAction,mockData)=>{
        jest.mock(mockPath,async()=>{       
          return{
            mockAction: Promise.resolve(mockData)
            }
       })
 }