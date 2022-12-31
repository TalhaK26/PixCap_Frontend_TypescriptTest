// Added empty export{} to reomve this error: Cannot redeclare block-scoped variable 'ceo'.ts(2451)
export {};

//Employee Interface
interface Employee {
  uniqueId: number;
  name: string;
  subordinates: Employee[];
}

//CEO JSON Data
const ceo: Employee = {
  uniqueId: 1010,
  name: "Mark Zuckerberg",
  subordinates: [
    {
      uniqueId: 111,
      name: "Sarah Donald",
      subordinates: [
        {
          uniqueId: 112,
          name: "Cassandra Reynolds",
          subordinates: [
            {
              uniqueId: 113,
              name: "Mary Blue",
              subordinates: [],
            },
            {
              uniqueId: 114,
              name: "Bob Saget",
              subordinates: [
                {
                  uniqueId: 115,
                  name: "Tina Teff",
                  subordinates: [
                    {
                      uniqueId: 116,
                      name: "Will Turner",
                      subordinates: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      uniqueId: 221,
      name: "Tyler Simpson",
      subordinates: [
        {
          uniqueId: 222,
          name: "Harry Tobs",
          subordinates: [
            {
              uniqueId: 223,
              name: "Thomas Brown",
              subordinates: [],
            },
          ],
        },
        {
          uniqueId: 224,
          name: "George Carrey",
          subordinates: [],
        },
        {
          uniqueId: 225,
          name: "Gary Styles",
          subordinates: [],
        },
      ],
    },
    {
      uniqueId: 331,
      name: "Bruce Willis",
      subordinates: [],
    },
    {
      uniqueId: 332,
      name: "Georgina Flangy",
      subordinates: [
        {
          uniqueId: 333,
          name: "Sophie Turner",
          subordinates: [],
        },
      ],
    },
  ],
};

//Concrete Class of EmployeeOrgApp
class EmployeeOrgApp {
  ceoObj: Employee;
  prevStateCeo: Employee;

  //Concrete Class Constructor
  constructor(obj: Employee) {
    this.ceoObj = obj;
    this.prevStateCeo = JSON.parse(JSON.stringify(this.ceoObj));
  }

  //move Method
  move = (supervisorID: number, employeeID: number): void => {
    var empObject: any = null;
    var empIndex: any = null;
    var empSubordinateIndex: any = null;
    var empSubordinates: any = null;

    this.ceoObj.subordinates.forEach(async (item, index) => {
      await item.subordinates.forEach((emp, ind) => {
        if (emp.uniqueId === employeeID) {
          empObject = { ...emp, subordinates: [] };
          empIndex = ind;
          empSubordinates = [...emp.subordinates];
          empSubordinateIndex = index;
        }
      });

      if (item.uniqueId === supervisorID) {
        if (empObject) {
          item.subordinates.push(empObject);
        }
      }

      if (empIndex > -1 && empSubordinateIndex === index) {
        const filteredSubordinates = item.subordinates.filter(
          (x, i) => i !== empIndex
        );
        item.subordinates = [...filteredSubordinates, ...empSubordinates];
      }
    });

    console.log(
      "Cassandra is moved to a new supervisor (Bruce Willis): ",
      this.ceoObj
    );
  };

  // Undo last move action
  undo = (): void => {
    console.log("Undo: ", this.prevStateCeo);
  };

  //  Redo last undone action
  redo = (): void => {
    console.log("Redo: ", this.ceoObj);
  };
}

//Class Instant
const app = new EmployeeOrgApp(ceo);

// Calling undo method
// First param should be Supervisor Id and Second param should be Employee Id
app.move(331, 112);

// Calling undo method
app.undo();

// Calling redo method
app.redo();
