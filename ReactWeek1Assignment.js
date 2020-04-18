class Student {
  constructor(name, email, community) {
    this.name = name;
    this.email = email;
    this.community = community;
  }
}

class Bootcamp {
  constructor(name, level, students = []) {
    this.name = name;
    this.level = level;
    this.students = students;
  }

  registerStudent(studentToRegister) {
    const cond = this.students.filter(
    (student) => student.email === studentToRegister.email
    );
    if (cond.length < 1) {
        console.log(
            `Registering ${studentToRegister.email} to the bootcamp ${this.name}`
        )
      this.students.push(studentToRegister);
    }
    return this.students;
  }
}

const bootcamp = new Bootcamp ("nucamp", "react");
bootcamp.registerStudent(
    new Student("Kelvin", "kelvin.mai@gmail.com", "Nucamp")
);
bootcamp.registerStudent(
    new Student("Tupac", "tupac.shakur@gmail.com", "Nucamp")
)

console.log(bootcamp)
