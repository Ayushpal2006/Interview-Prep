/* ======================================================================
   OBJECT-ORIENTED PROGRAMMING (OOP) INTERVIEW PREPARATION DATASET
   Primary Source of Truth: Uploaded C++ OOP PDF Reference
   ====================================================================== */

export const FOUR_PILLARS = [
  {
    id: "encapsulation",
    title: "1. Encapsulation",
    subtitle: "Data Hiding & Bundling",
    color: "#FF6B6B", // C.coral
    badge: "Data Protection",
    oneLiner: "Combining data members and functions into a single unit (class) while restricting direct external access.",
    analogy: "A medical capsule: The active ingredients (data) are wrapped inside a shell (class), accessible only through controlled intake (getters/setters).",
    cxxSnippet: `class Account {
private:
    double balance; // Private data hidden from outside
public:
    void deposit(double amount) { if(amount > 0) balance += amount; }
    double getBalance() { return balance; } // Getter
};`,
    output: "Balance: 500",
    outputExplanation: "Direct access to balance variable is blocked; modification occurs safely through deposit() method.",
    interviewQuestion: "How does Encapsulation enable Data Hiding in C++?",
    goodAnswer: "Encapsulation bundles state and behavior into a class, using private/protected access specifiers to restrict direct access to variables. Access is controlled strictly via public member functions (getters/setters), reducing negative coupling effects.",
  },
  {
    id: "abstraction",
    title: "2. Abstraction",
    subtitle: "Essential Interface View",
    color: "#4D96FF", // C.sky
    badge: "Complexity Hiding",
    oneLiner: "Displaying only essential features of an object while hiding background implementation details.",
    analogy: "Driving a car: You use the steering wheel and accelerator pedal (essential interface) without worrying about internal combustion or transmission gearing.",
    cxxSnippet: `class Car {
public:
    virtual void startEngine() = 0; // Pure abstract interface
};
class SportsCar : public Car {
public:
    void startEngine() override { cout << "V8 Engine Started!"; }
};`,
    output: "V8 Engine Started!",
    outputExplanation: "Caller interacts strictly with the abstract Car interface without knowing internal V8 ignition details.",
    interviewQuestion: "What is the difference between Abstraction and Encapsulation?",
    goodAnswer: "Abstraction solves the design-level problem of 'WHAT an object does' by exposing a clean interface. Encapsulation solves the implementation-level problem of 'HOW data is protected' by restricting access to class members.",
  },
  {
    id: "inheritance",
    title: "3. Inheritance",
    subtitle: "Reusability & Hierarchy",
    color: "#6BCB77", // C.leaf
    badge: "Code Reuse",
    oneLiner: "Process where a derived class acquires all properties and behaviors of a parent base class automatically.",
    analogy: "Genetics: A child inherits physical traits (DNA/attributes) from parents while having their own unique characteristics.",
    cxxSnippet: `class Animal {
public:
    void eat() { cout << "Eating... "; }
};
class Dog : public Animal {
public:
    void bark() { cout << "Barking!"; }
};
int main() { Dog d; d.eat(); d.bark(); }`,
    output: "Eating... Barking!",
    outputExplanation: "Dog object reuses eat() method from base Animal class and executes its own bark() method.",
    interviewQuestion: "Why is inheritance used, and what are its visibility modes?",
    goodAnswer: "Inheritance promotes code reusability and establishes an IS-A relationship. In C++, visibility modes (public, protected, private) control how inherited base members are accessed within the derived class.",
  },
  {
    id: "polymorphism",
    title: "4. Polymorphism",
    subtitle: "Many Forms / Dynamic Dispatch",
    color: "#9B5DE5", // C.grape
    badge: "Flexibility",
    oneLiner: "The ability to present the same function or interface for differing underlying data types or behaviors.",
    analogy: "A button: A 'Start' button on a stopwatch starts a timer, on a car starts the engine, and on a game starts playback.",
    cxxSnippet: `class Base {
public:
    virtual void show() { cout << "Base"; }
};
class Derived : public Base {
public:
    void show() override { cout << "Derived"; }
};
int main() { Base* b = new Derived(); b->show(); }`,
    output: "Derived",
    outputExplanation: "Base pointer points to Derived object; virtual keyword resolves dynamic dispatch to Derived::show() at runtime.",
    interviewQuestion: "What is polymorphism and what are its two main types?",
    goodAnswer: "Polymorphism (Poly = many, Morphism = forms) allows one interface to invoke different implementations. It divides into Compile-Time (Function/Operator Overloading) and Runtime (Function Overriding using Virtual Functions).",
  },
];

export const COMPARISONS = [
  {
    title: "Encapsulation vs. Abstraction",
    colorL: "#FF6B6B",
    colorR: "#4D96FF",
    leftName: "Encapsulation",
    rightName: "Abstraction",
    rows: [
      { aspect: "Primary Focus", left: "Data protection & hiding internal state", right: "Hiding complexity & showing essential view" },
      { aspect: "Level", left: "Implementation / Coding level", right: "Design / Architecture level" },
      { aspect: "Mechanism", left: "Private members + Public Getters/Setters", right: "Abstract Classes & Pure Virtual Functions" },
      { aspect: "Question Solved", left: "HOW to shield internal variables?", right: "WHAT interface to expose to caller?" }
    ]
  },
  {
    title: "Class vs. Object",
    colorL: "#38C6D9",
    colorR: "#FFC93C",
    leftName: "Class (Blueprint)",
    rightName: "Object (Instance)",
    rows: [
      { aspect: "Definition", left: "User-defined data type blueprint describing structure", right: "Runtime entity & actual instance of a class" },
      { aspect: "Memory Allocation", left: "Consumes NO memory space until instantiated", right: "Allocates physical memory in Stack or Heap" },
      { aspect: "Existence", left: "Logical entity created at compile time", right: "Physical entity created at runtime" },
      { aspect: "C++ Creation", left: "`class Student { int id; };`", right: "`Student s;` or `Student* s = new Student();`" }
    ]
  },
  {
    title: "Inheritance (IS-A) vs. Composition (HAS-A)",
    colorL: "#6BCB77",
    colorR: "#FFA94D",
    leftName: "Inheritance (IS-A)",
    rightName: "Composition / Aggregation (HAS-A)",
    rows: [
      { aspect: "Relationship", left: "Child class IS-A parent class (Dog IS-A Animal)", right: "Class HAS-A entity reference (Car HAS-A Engine)" },
      { aspect: "Coupling", left: "Tightly coupled (Changes in base affect derived)", right: "Loosely coupled (Independent entity lifetimes)" },
      { aspect: "Flexibility", left: "Static at compile time", right: "Dynamic / can change at runtime" },
      { aspect: "PDF Definition", left: "Acquires attributes and behaviors of parent", right: "Process where one class defines another as entity reference" }
    ]
  },
  {
    title: "Function Overloading vs. Function Overriding",
    colorL: "#38C6D9",
    colorR: "#9B5DE5",
    leftName: "Function Overloading",
    rightName: "Function Overriding",
    rows: [
      { aspect: "Binding Time", left: "Compile-Time (Static Binding)", right: "Runtime (Dynamic Binding)" },
      { aspect: "Scope", left: "Same class scope", right: "Parent (Base) and Child (Derived) classes" },
      { aspect: "Signature", left: "Same name, DIFFERENT parameter types/counts", right: "Same name, EXACT SAME parameter types & return" },
      { aspect: "Keywords", left: "No special keywords required", right: "Uses `virtual` in Base and `override` in Derived" }
    ]
  },
  {
    title: "Compile-Time vs. Runtime Polymorphism",
    colorL: "#FFC93C",
    colorR: "#E8734A",
    leftName: "Compile-Time Polymorphism",
    rightName: "Runtime Polymorphism",
    rows: [
      { aspect: "Execution Speed", left: "Faster execution (resolved during compilation)", right: "Slight overhead due to V-TABLE lookup at runtime" },
      { aspect: "Examples", left: "Method Overloading, Operator Overloading", right: "Function Overriding with Virtual Functions" },
      { aspect: "Pointer Necessity", left: "Direct function call resolution", right: "Requires Base Pointer / Reference to Derived object" },
      { aspect: "Flexibility", left: "Less flexible (fixed at compile time)", right: "Highly flexible (dynamic object dispatch)" }
    ]
  },
  {
    title: "Constructor vs. Destructor",
    colorL: "#4D96FF",
    colorR: "#FF6B6B",
    leftName: "Constructor",
    rightName: "Destructor",
    rows: [
      { aspect: "Purpose", left: "Initializes object data members upon creation", right: "Destructs object & releases memory upon deletion" },
      { aspect: "Syntax", left: "`ClassName(...)`", right: "`~ClassName()` (Prefixed with tilde)" },
      { aspect: "Overloading", left: "Can be overloaded (Default, Parameterized, Copy)", right: "CANNOT be overloaded (Only 1 per class)" },
      { aspect: "Execution Order", left: "Executed in order of creation (Base -> Derived)", right: "Executed in REVERSE order of creation (LIFO)" }
    ]
  },
  {
    title: "Private vs. Protected vs. Public Access Specifiers",
    colorL: "#FF6B6B",
    colorR: "#6BCB77",
    leftName: "Private / Protected",
    rightName: "Public",
    rows: [
      { aspect: "Private Scope", left: "Accessible ONLY inside defining class", right: "N/A" },
      { aspect: "Protected Scope", left: "Accessible inside defining class AND child derived classes", right: "N/A" },
      { aspect: "Public Scope", left: "N/A", right: "Accessible from ANYWHERE in program" },
      { aspect: "Default Class Mode", left: "`class` defaults to private access", right: "`struct` defaults to public access" }
    ]
  },
  {
    title: "Virtual Function vs. Pure Virtual Function",
    colorL: "#9B5DE5",
    colorR: "#FF8FB1",
    leftName: "Virtual Function",
    rightName: "Pure Virtual Function",
    rows: [
      { aspect: "Base Implementation", left: "Provides default implementation in base class", right: "Has NO definition in base class (`= 0`)" },
      { aspect: "Instantiation", left: "Base class CAN be instantiated", right: "Base class CANNOT be instantiated (Abstract Class)" },
      { aspect: "Derived Requirement", left: "Derived override is optional", right: "Derived override is MANDATORY (unless derived is abstract)" },
      { aspect: "Syntax", left: "`virtual void show() { ... }`", right: "`virtual void show() = 0;`" }
    ]
  }
];

export const TOPICS = [
  {
    id: "oop-basics",
    title: "1. Object-Oriented Programming (OOP) Paradigm",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Easy",
    concept: "Object-Oriented Programming is a software design paradigm that structures code using classes and objects. It simplifies software development and maintenance through modularity, reusability, and encapsulation.",
    keyPoints: [
      "Paradigm based on real-world entity modeling (Classes & Objects).",
      "Combines data fields (properties) and methods (functions) together.",
      "Reduces code redundancy and enhances software maintainability.",
      "Primary C++ mechanism for modular and scalable system design."
    ],
    code: `#include <iostream>
using namespace std;

class SystemModule {
public:
    void initialize() {
        cout << "Module initialized cleanly.";
    }
};

int main() {
    SystemModule sys;
    sys.initialize();
    return 0;
}`,
    output: "Module initialized cleanly.",
    outputExplanation: "SystemModule object `sys` is instantiated and invokes its public member function.",
    interviewQuestion: "What is OOP and how does it improve software maintenance over procedural programming?",
    goodAnswer: "OOP structures programs around objects containing data and behavior. Unlike procedural programming which focuses on functions operating on global state, OOP encapsulates state within objects, minimizing side effects and making code modular, reusable, and easy to maintain.",
    followUp: "What are the core trade-offs of OOP compared to Functional or Procedural paradigms?",
    trap: "Claiming OOP is always faster or better than procedural code—OOP introduces slight object construction and dynamic dispatch overheads."
  },
  {
    id: "class-and-object",
    title: "2. Class vs. Object & Memory Allocation",
    importance: "HIGH FREQUENCY",
    category: "Definition",
    difficulty: "Easy",
    concept: "A Class is a user-defined blueprint/data type describing properties and functions. It consumes NO memory until instantiated. An Object is a runtime instance of a class that occupies actual memory in Stack or Heap.",
    keyPoints: [
      "Class = Logical representation / Blueprint (does not take memory space).",
      "Object = Runtime entity / Instance (occupies memory in Stack or Heap).",
      "In C++, stack creation: `student s;` (allocated on stack memory).",
      "In C++, heap creation with `new`: `student* s = new student();` (heap memory pointer stored on stack)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class student {
public:
    int id;
    string name;
};

int main() {
    student s1; // Stack allocation
    s1.id = 101;
    
    student* s2 = new student(); // Heap allocation
    s2->id = 102;
    
    cout << "s1.id: " << s1.id << ", s2->id: " << s2->id;
    delete s2;
}`,
    output: "s1.id: 101, s2->id: 102",
    outputExplanation: "`s1` lives on the stack. `s2` pointer lives on stack pointing to heap-allocated student object.",
    sourceNote: "The source PDF states: `student s = new student();` and notes stack null assignment when omitting `new`. In standard C++, `student s;` instantiates a direct stack object, while `student* s = new student();` allocates on the heap.",
    interviewQuestion: "What is the difference between a Class and an Object, and how is memory allocated for objects in C++?",
    goodAnswer: "A Class is a logical data type blueprint that takes no memory space. An Object is a runtime instance. In C++, allocating an object without `new` (`student s;`) creates it on the stack. Using `new` (`student* s = new student();`) allocates memory in the Heap and returns its memory address stored in a stack pointer.",
    followUp: "What happens if you fail to call `delete` on an object allocated with `new` in C++?",
    trap: "Confusing Java reference object creation with C++ direct stack value allocation."
  },
  {
    id: "encapsulation-data-hiding",
    title: "3. Encapsulation & Data Hiding",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Encapsulation combines data and methods into a single class unit, exposing public getters/setters while making attributes private. Data Hiding restricts direct access to reduce negative side effects due to internal dependencies.",
    keyPoints: [
      "Encapsulation = Wrapping data and functions into a single class unit.",
      "Data Hiding = Language feature restricting direct access to object members (`private`, `protected`).",
      "Attributes are kept private; public getter/setter methods allow controlled access.",
      "Prevents invalid state transitions by validating inputs in setters."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class BankAccount {
private:
    double balance; // Data Hiding

public:
    BankAccount(double initial) { balance = initial; }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }
    double getBalance() { return balance; }
};

int main() {
    BankAccount acc(1000);
    acc.deposit(500);
    cout << "Balance: " << acc.getBalance();
}`,
    output: "Balance: 1500",
    outputExplanation: "Direct modification of `balance` is forbidden; deposit() validates amount before modifying private state.",
    interviewQuestion: "Why is Encapsulation necessary, and how does it relate to Data Hiding?",
    goodAnswer: "Encapsulation bundles variables and functions into a single class structure. Data hiding is achieved within encapsulation by marking data members `private` or `protected`. This prevents unauthorized external modification, enforces business logic validation, and decouples internal representation from public API consumers.",
    followUp: "Can data hiding be bypassed in C++?",
    trap: "Thinking Encapsulation and Data Hiding are identical terms—Encapsulation is the container technique, while Data Hiding is the access restriction rule."
  },
  {
    id: "abstraction-data-binding",
    title: "4. Abstraction & Data Binding",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Abstraction creates an abstract model of a real-life problem by reducing unnecessary implementation details. Data Binding is the process of binding application UI to business logic so changes in logic reflect directly.",
    keyPoints: [
      "Abstraction hides complex internal logic, showing only essential interface features.",
      "Implemented in C++ using Abstract Base Classes and Pure Virtual Functions.",
      "Data Binding links business logic with application UI components dynamically.",
      "Provides standard reusable solution templates for nebulous real-life problem models."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class NotificationService {
public:
    virtual void send(string msg) = 0; // Abstract interface
};

class EmailService : public NotificationService {
public:
    void send(string msg) override {
        cout << "Email Sent: " << msg;
    }
};

int main() {
    NotificationService* service = new EmailService();
    service->send("Interview Scheduled!");
    delete service;
}`,
    output: "Email Sent: Interview Scheduled!",
    outputExplanation: "Caller interacts via NotificationService abstract interface without knowing internal Email server configuration.",
    interviewQuestion: "How do you achieve Abstraction in C++ and what is Data Binding?",
    goodAnswer: "Abstraction is achieved in C++ using abstract classes with pure virtual functions (`= 0`), defining a standard high-level contract without specifying implementation details. Data binding refers to connecting application UI components directly to underlying business logic data fields.",
    followUp: "Can we instantiate a class that provides partial abstraction?",
    trap: "Assuming Abstraction means making data members private (that is Encapsulation)."
  },
  {
    id: "inheritance-base-derived",
    title: "5. Inheritance & Visibility Modes",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Inheritance allows a derived class to acquire members of a base class. In C++, visibility modes (`public`, `protected`, `private`) dictate how base members become accessible inside the derived class.",
    keyPoints: [
      "Base Class = Parent class whose members are inherited.",
      "Derived Class = Specialized child class inheriting members.",
      "Syntax: `class Derived : visibility-mode Base {};`",
      "Public Mode: Base public -> Derived public, Base protected -> Derived protected.",
      "Protected Mode: Base public/protected -> Derived protected.",
      "Private Mode: Base public/protected -> Derived private. Base private members are NEVER directly accessible."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Base {
private:   int a = 1;
protected: int b = 2;
public:    int c = 3;
};

class Derived : public Base {
public:
    void display() {
        // cout << a; // ERROR: private in Base
        cout << "b: " << b << ", c: " << c;
    }
};

int main() { Derived d; d.display(); }`,
    output: "b: 2, c: 3",
    outputExplanation: "Protected member `b` and public member `c` are accessible in Derived. Private member `a` is inaccessible.",
    interviewQuestion: "Explain C++ visibility modes in inheritance. What happens when a class inherits privately?",
    goodAnswer: "In public inheritance, base access levels remain intact in derived class. In protected inheritance, base public and protected members become protected in derived class. In private inheritance, base public and protected members become private members of derived class, hiding them from outside callers and further subclasses.",
    followUp: "Can a derived class access private members of a base class?",
    trap: "Believing `private` base members become `private` in derived class—they remain entirely inaccessible to derived classes unless `friend` is declared."
  },
  {
    id: "types-of-inheritance",
    title: "6. The 5 Types of Inheritance",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "C++ supports 5 distinct inheritance structures: Single, Multilevel, Hierarchical, Multiple, and Hybrid (combination of structures).",
    keyPoints: [
      "1. Single Inheritance: One derived class inherits from one base class (A -> B).",
      "2. Multilevel Inheritance: Derived class derived from another derived class (A -> B -> C).",
      "3. Hierarchical Inheritance: Multiple derived classes inherit from one base class (A -> B and A -> C).",
      "4. Multiple Inheritance: One derived class inherits from two or more base classes (A, B -> C).",
      "5. Hybrid Inheritance: Combination of two or more inheritance structures."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Engine {
public:
    void startEngine() { cout << "Engine Started. "; }
};

class Radio {
public:
    void playMusic() { cout << "Playing Music."; }
};

class Car : public Engine, public Radio {};

int main() {
    Car c;
    c.startEngine();
    c.playMusic();
}`,
    output: "Engine Started. Playing Music.",
    outputExplanation: "Car inherits simultaneously from Engine and Radio base classes using Multiple Inheritance.",
    interviewQuestion: "What is Multiple Inheritance in C++ and what major issue can arise with it?",
    goodAnswer: "Multiple Inheritance allows a derived class to inherit attributes and methods from more than one base class. The primary issue is the Diamond Problem (ambiguity when two base classes inherit from a single common ancestor), resolved using Virtual Inheritance.",
    followUp: "Why do languages like Java prohibit multiple class inheritance?",
    trap: "Confusing Multilevel inheritance (A -> B -> C) with Multiple inheritance (A, B -> C)."
  },
  {
    id: "polymorphism-overview",
    title: "7. Polymorphism Overview & Classification",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Polymorphism means 'many forms'. It allows uniform interfaces to execute different underlying logic. Divided strictly into Compile-Time (Static) and Runtime (Dynamic) Polymorphism.",
    keyPoints: [
      "Poly = 'many', Morphism = 'forms'.",
      "Compile-Time (Static): Function Overloading & Operator Overloading.",
      "Runtime (Dynamic): Function Overriding with Virtual Functions.",
      "Static binding happens during compilation; dynamic binding uses runtime V-TABLE."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Shape {
public:
    void draw(int r) { cout << "Circle r=" << r << " "; }
    void draw(int w, int h) { cout << "Rect " << w << "x" << h; }
};

int main() {
    Shape s;
    s.draw(5);
    s.draw(10, 20);
}`,
    output: "Circle r=5 Rect 10x20",
    outputExplanation: "Compiler selects appropriate overloaded `draw` function based on parameter argument signatures.",
    interviewQuestion: "What is Polymorphism and what are its two major classifications?",
    goodAnswer: "Polymorphism allows an interface to exhibit different behaviors based on underlying object types. It classifies into Compile-Time Polymorphism (resolved at compile time via function/operator overloading) and Runtime Polymorphism (resolved dynamically at runtime via function overriding and virtual functions).",
    followUp: "Which polymorphism type exhibits faster execution speed?",
    trap: "Assuming runtime polymorphism is faster—compile-time polymorphism has zero runtime dispatch overhead."
  },
  {
    id: "function-overloading",
    title: "8. Function Overloading & Operator Overloading",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Function Overloading allows multiple functions with the same name in the same scope, differentiated by parameter signature. Operator Overloading allows standard operators (+, -, ==) to be redefined for class objects.",
    keyPoints: [
      "Overloading bases: 1. Parameter data types, 2. Number of parameters, 3. Sequence of parameters.",
      "Function return type ALONE is NOT sufficient to overload a function.",
      "Operator Overloading redefines built-in C++ operators for user-defined class types.",
      "Resolved entirely at compile-time (Static Binding)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Add {
public:
    int add(int a, int b) { return (a + b); }
    int add(int a, int b, int c) { return (a + b + c); }
};

int main() {
    Add obj;
    cout << obj.add(2, 3) << " " << obj.add(2, 3, 4);
}`,
    output: "5 9",
    outputExplanation: "`add(2,3)` resolves to 2-parameter version; `add(2,3,4)` resolves to 3-parameter version at compile time.",
    interviewQuestion: "Can we overload a function in C++ based ONLY on its return type?",
    goodAnswer: "No, C++ function overloading cannot be done based solely on return type. The compiler differentiates overloaded functions by their parameter signatures (number, type, or order of arguments). If signatures are identical, return type differences produce a compile error.",
    followUp: "Which operators cannot be overloaded in C++?",
    trap: "Trying to overload functions with identical parameters but different return types."
  },
  {
    id: "function-overriding",
    title: "9. Function Overriding & Dynamic Binding",
    importance: "HIGH FREQUENCY",
    category: "Difference",
    difficulty: "Medium",
    concept: "Function Overriding occurs when a derived child class provides a specific implementation for a member function already defined in its parent base class, matching exact name and parameters.",
    keyPoints: [
      "Child class overrides parent class function definition.",
      "Function signature (name, parameter types, count, return type) MUST be identical.",
      "Enables Runtime Polymorphism (Dynamic Binding).",
      "Function call is determined at runtime based on object pointed to by base pointer."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Base_class {
public:
    virtual void show() { cout << "Apni Kaksha base"; }
};

class Derived_class : public Base_class {
public:
    void show() override { cout << "Apni Kaksha derived"; }
};

int main() {
    Base_class* b;
    Derived_class d;
    b = &d;
    b->show();
}`,
    output: "Apni Kaksha derived",
    outputExplanation: "Base_class pointer `b` points to Derived_class instance `d`. Virtual keyword forces execution of Derived_class::show().",
    interviewQuestion: "What is function overriding and how does C++ determine which function to call at runtime?",
    goodAnswer: "Function overriding occurs when a derived class redefines a base class member function with matching signature. When declared `virtual` in base class, C++ resolves the function call dynamically at runtime using the Virtual Table (V-TABLE) based on actual object type pointed to by base pointer.",
    followUp: "What happens if the `virtual` keyword is omitted in the base class function?",
    trap: "Calling a non-virtual overridden function through a base pointer results in static binding (base function executed)."
  },
  {
    id: "virtual-function",
    title: "10. Virtual Function & V-TABLE Mechanism",
    importance: "HIGH FREQUENCY",
    category: "Why/How",
    difficulty: "Hard",
    concept: "A Virtual Function is a base class member function declared with the `virtual` keyword and overridden in derived classes. C++ uses base pointers to execute derived overrides dynamically at runtime.",
    keyPoints: [
      "Declared with `virtual` keyword in base class.",
      "Determines at runtime which function to call based on target object type pointed to by Base pointer (`bptr = &d; bptr->print()`).",
      "Key Rule 1: Virtual functions CANNOT be static.",
      "Key Rule 2: A class can have a VIRTUAL DESTRUCTOR, but CANNOT have a VIRTUAL CONSTRUCTOR.",
      "Uses VPTR (Virtual Pointer) and V-TABLE (Virtual Table) maintained per class."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class base {
public:
    virtual void print() { cout << "print base class" << endl; }
    void show() { cout << "show base class" << endl; }
};

class derived : public base {
public:
    void print() override { cout << "print derived class" << endl; }
    void show() { cout << "show derived class" << endl; }
};

int main() {
    base* bptr;
    derived d;
    bptr = &d;
    bptr->print();
    bptr->show();
}`,
    output: "print derived class\nshow base class",
    outputExplanation: "`print()` is virtual -> runtime dispatch calls `derived::print()`. `show()` is non-virtual -> compile-time static binding calls `base::show()`.",
    interviewQuestion: "Why can't constructors be virtual, but destructors can (and should) be virtual?",
    goodAnswer: "Constructors cannot be virtual because an object's V-TABLE is initialized during construction; at constructor execution time, object type setup is incomplete. Destructors SHOULD be virtual when deleting derived objects via base class pointers to ensure complete derived cleanup, preventing memory leaks.",
    followUp: "How much memory overhead does a VPTR introduce into an object?",
    trap: "Declaring static virtual functions or expecting virtual constructors to compile."
  },
  {
    id: "pure-virtual-function",
    title: "11. Pure Virtual Function",
    importance: "HIGH FREQUENCY",
    category: "Definition",
    difficulty: "Hard",
    concept: "A Pure Virtual Function is a function declared in a base class that has no definition relative to the base class (`virtual void display() = 0;`). It acts as a mandatory placeholder contract for derived classes.",
    keyPoints: [
      "Declared by placing `= 0` in base class function declaration.",
      "Has no implementation in the base class.",
      "Forces all non-abstract derived classes to provide an implementation.",
      "Serves as the foundation for defining abstract base interfaces."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Base {
public:
    virtual void show() = 0; // Pure virtual
};

class Derived : public Base {
public:
    void show() override { cout << "You can see me !"; }
};

int main() {
    Base* bptr;
    Derived d;
    bptr = &d;
    bptr->show();
}`,
    output: "You can see me !",
    outputExplanation: "Derived class provides implementation for pure virtual function `show()`, allowing Base pointer execution.",
    interviewQuestion: "What is a Pure Virtual Function and why is it used?",
    goodAnswer: "A pure virtual function is declared with `virtual ReturnType FunctionName() = 0;` in a base class and has no base body definition. It acts as an abstract contract placeholder, forcing derived classes to override it and enabling pure runtime polymorphism via base pointers.",
    followUp: "Can a pure virtual function ever have a body in C++?",
    trap: "Attempting to instantiate a base class containing an un-overridden pure virtual function."
  },
  {
    id: "abstract-classes",
    title: "12. Abstract Classes",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Hard",
    concept: "An Abstract Class is a class containing at least one pure virtual function. Objects of abstract classes CANNOT be created directly; it serves as a foundational blueprint providing traits to derived classes.",
    keyPoints: [
      "Made abstract in C++ by declaring at least one pure virtual function (`= 0`).",
      "CANNOT instantiate objects of an abstract class (`Base b;` is compile error).",
      "Can contain normal variables, constructors, and non-virtual functions.",
      "Base class pointers CAN point to concrete derived class objects (`Base* b = new Derived();`)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Shape {
public:
    virtual void draw() = 0; // Makes Shape abstract
};

class Rectangle : public Shape {
public:
    void draw() override { cout << "Rectangle "; }
};

class Square : public Shape {
public:
    void draw() override { cout << "Square"; }
};

int main() {
    Rectangle rec;
    Square sq;
    rec.draw();
    sq.draw();
}`,
    output: "Rectangle Square",
    outputExplanation: "Shape cannot be instantiated. Derived classes Rectangle and Square implement draw() and instantiate concrete objects.",
    interviewQuestion: "Why can't we instantiate an Abstract Class in C++?",
    goodAnswer: "Abstract classes contain incomplete interface contracts (pure virtual functions with no implementation). Because calling an undefined pure virtual function would break runtime execution, C++ forbids instantiating abstract objects directly. They exist purely to provide base pointers and interfaces for derived classes.",
    followUp: "Can an abstract class have a constructor in C++?",
    trap: "Thinking abstract classes cannot have constructors—they CAN have constructors called by derived constructors."
  },
  {
    id: "constructors",
    title: "13. Constructors (Default, Parameterized, Copy)",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "A Constructor is a special member function invoked automatically upon object creation to initialize data members. Has same name as class and no return type.",
    keyPoints: [
      "1. Default Constructor: Takes no arguments, invoked automatically on instantiation.",
      "2. Parameterized Constructor: Takes parameters to initialize distinct object values.",
      "3. Copy Constructor: Initializes an object from another existing object of the same class.",
      "Syntax difference: `go a1(20);` calls Parameterized Constructor. `go a2(a1);` calls Copy Constructor."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class go {
public:
    int x;
    go(int a) { x = a; }       // Parameterized
    go(const go &i) { x = i.x; } // Copy
};

int main() {
    go a1(20); // Parameterized
    go a2(a1); // Copy Constructor
    cout << "a2.x = " << a2.x;
}`,
    output: "a2.x = 20",
    outputExplanation: "`a1` uses Parameterized constructor (x=20). `a2(a1)` calls Copy Constructor to initialize `a2.x` from `a1.x`.",
    interviewQuestion: "What is the difference between Parameterized and Copy Constructors in C++?",
    goodAnswer: "A Parameterized Constructor initializes an object using direct scalar arguments passed during creation (e.g., `go a1(20)`). A Copy Constructor creates a new object as a copy of an existing object of the same class (e.g., `go a2(a1)`), taking a reference to the source object (`const go &i`).",
    followUp: "Why must the argument to a Copy Constructor be passed by reference (`const ClassName &`)?",
    trap: "Passing copy constructor argument by value leads to infinite recursive copy constructor calls."
  },
  {
    id: "destructor",
    title: "14. Destructor & Object Lifetime",
    importance: "HIGH FREQUENCY",
    category: "Definition",
    difficulty: "Medium",
    concept: "A Destructor works opposite to a constructor; it destructs objects and releases resources automatically when an object goes out of scope or is deleted. Has same name as class prefixed with tilde (`~`).",
    keyPoints: [
      "Invoked automatically when object lifetime ends.",
      "Prefix syntax with tilde: `~ClassName()`.",
      "Can be defined ONLY ONCE per class (cannot be overloaded, takes no arguments).",
      "Destructors for local objects execute in REVERSE order of construction (LIFO stack destruction)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class A {
public:
    A() { cout << "C "; }
    ~A() { cout << "D "; }
};

int main() {
    A a;
    A b;
    return 0;
}`,
    output: "C C D D ",
    outputExplanation: "Constructors execute sequentially during creation (C C). Destructors execute in reverse LIFO order upon exit (D D).",
    interviewQuestion: "What is a Destructor, and in what order are constructors and destructors executed?",
    goodAnswer: "A Destructor (`~ClassName()`) is automatically invoked to clean up object memory upon destruction. Objects on the stack are constructed sequentially and destructed in reverse order (Last In, First Out).",
    followUp: "What happens if a destructor throws an unhandled exception during stack unwinding?",
    trap: "Attempting to overload destructors with different parameter lists."
  },
  {
    id: "this-pointer",
    title: "15. 'this' Pointer",
    importance: "HIGH FREQUENCY",
    category: "Why/How",
    difficulty: "Medium",
    concept: "`this` is an implicit keyword pointer holding the memory address of the current calling instance of the class.",
    keyPoints: [
      "1. Refers to current class instance variable (e.g., `this->data = x;` when parameter name matches member name).",
      "2. Passes current object as parameter to another method.",
      "3. Used to declare indexers and enable method chaining (`return *this;`)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

struct node {
    int data;
    node *next;

    node(int data) {
        this->data = data; // Differentiates member data from parameter data
        this->next = NULL;
    }
};

int main() {
    node n(100);
    cout << "Node data: " << n.data;
}`,
    output: "Node data: 100",
    outputExplanation: "`this->data` explicitly targets class instance variable, avoiding shadow variable ambiguity with constructor parameter `data`.",
    interviewQuestion: "What is the 'this' pointer in C++ and name 3 primary use cases?",
    goodAnswer: "The `this` pointer is an implicit pointer passed to non-static member functions, pointing to the invoking object. Primary uses: 1) Resolving naming conflicts when parameter names match class member names (`this->data = data`), 2) Returning reference to current object for method chaining (`return *this`), 3) Passing current object to external functions.",
    followUp: "Is `this` pointer available inside static member functions?",
    trap: "Attempting to use `this` pointer inside a `static` member function (static methods do not have an object instance)."
  },
  {
    id: "friend-function",
    title: "16. Friend Function",
    importance: "HIGH FREQUENCY",
    category: "Conceptual",
    difficulty: "Hard",
    concept: "A Friend Function is a non-member function granted explicit permission inside a class definition to access the class's `private` and `protected` data members.",
    keyPoints: [
      "Declared inside class definition using `friend` keyword.",
      "NOT a member function of the class (cannot be called with `obj.friendFunc()`).",
      "Cannot access private members directly; MUST use object reference and dot operator (`k.a * k.b`).",
      "Uses objects as parameters."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class A {
private:
    int a = 2;
    int b = 4;
public:
    friend int mul(A k);
};

int mul(A k) {
    return (k.a * k.b); // Accesses private members
}

int main() {
    A obj;
    cout << "Result: " << mul(obj);
}`,
    output: "Result: 8",
    outputExplanation: "Non-member function `mul()` accesses private data members `a` and `b` of class A via object parameter `k`.",
    interviewQuestion: "What is a Friend Function in C++ and how does it access private data?",
    goodAnswer: "A friend function is a non-member function declared inside a class using `friend`. It can access private and protected members of that class. Because it is not a member function, it cannot access members directly; it takes a class object as an argument and accesses members using dot operator (`obj.privateMember`).",
    followUp: "Is friendship in C++ inherited or mutual?",
    trap: "Friendship is neither inherited nor transitive/mutual (if B is friend of A, C derived from B is NOT friend of A)."
  },
  {
    id: "access-specifiers",
    title: "17. Access Specifiers (Private, Public, Protected)",
    importance: "HIGH FREQUENCY",
    category: "Definition",
    difficulty: "Easy",
    concept: "Access specifiers define how class variables and functions are accessed outside the class scope.",
    keyPoints: [
      "1. Private: Accessible ONLY within the same class. Inaccessible outside or by child classes.",
      "2. Public: Accessible from anywhere in the program.",
      "3. Protected: Accessible within the class AND derived child classes, but inaccessible to outside callers."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Vault {
private:   int secret = 999;
protected: int family = 123;
public:    int pub = 1;
};

int main() {
    Vault v;
    cout << "Public: " << v.pub;
    // cout << v.secret; // COMPILE ERROR
}`,
    output: "Public: 1",
    outputExplanation: "Public member `pub` is accessible directly outside class. Private and protected members produce compile errors.",
    interviewQuestion: "Differentiate between Private, Public, and Protected access specifiers in C++.",
    goodAnswer: "Private members are accessible only within the defining class. Protected members are accessible within the defining class and any derived child classes, but hidden from public scope. Public members are accessible anywhere in the application.",
    followUp: "What is the default access specifier for a `class` vs a `struct` in C++?",
    trap: "Forgetting that `class` defaults to `private` while `struct` defaults to `public` in C++."
  },
  {
    id: "virtual-inheritance",
    title: "18. Virtual Inheritance & Diamond Problem",
    importance: "IMPORTANT",
    category: "Scenario",
    difficulty: "Hard",
    concept: "Virtual Inheritance facilitates creating only ONE copy of a base object in a multiple inheritance hierarchy, resolving ambiguity caused by the Diamond Problem.",
    keyPoints: [
      "Solves Diamond Problem (A -> B, C -> D).",
      "Syntax: `class B : virtual public A {};`",
      "Ensures derived class D receives only a single shared instance copy of base class A.",
      "Eliminates scope resolution ambiguity (`d.A::x`)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class A {
public:
    int val = 10;
};

class B : virtual public A {};
class C : virtual public A {};
class D : public B, public C {};

int main() {
    D obj;
    cout << "Value: " << obj.val;
}`,
    output: "Value: 10",
    outputExplanation: "Virtual inheritance ensures class D contains only one shared subobject copy of A's `val` member.",
    interviewQuestion: "What is Virtual Inheritance in C++ and what problem does it solve?",
    goodAnswer: "Virtual Inheritance resolves the Diamond Problem in multiple inheritance where a derived class inherits two paths leading back to a common ancestor. By using `virtual public Base`, C++ ensures only a single shared subobject copy of Base is created, removing member duplication and ambiguity.",
    followUp: "How does virtual inheritance affect object layout in memory?",
    trap: "Omitting `virtual` keyword in intermediate base class declarations (B and C)."
  },
  {
    id: "delete-operators",
    title: "19. Dynamic Memory: delete vs. delete[]",
    importance: "IMPORTANT",
    category: "Code",
    difficulty: "Medium",
    concept: "`delete` is used to release a single unit of heap memory, whereas `delete[]` is used to release an allocated heap array.",
    keyPoints: [
      "`delete ptr;` releases a single object and calls 1 destructor.",
      "`delete[] arrPtr;` releases an array of objects and calls destructors for every element.",
      "Using `delete` on array memory causes undefined behavior and memory leaks."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int* p = new int(42);
    delete p; // Single unit

    int* arr = new int[5];
    delete[] arr; // Array release

    cout << "Memory released cleanly.";
}`,
    output: "Memory released cleanly.",
    outputExplanation: "Scalar `delete` frees single integer pointer `p`; vector `delete[]` frees array allocation `arr`.",
    interviewQuestion: "What happens if you use `delete` instead of `delete[]` on an array allocated with `new[]`?",
    goodAnswer: "Using scalar `delete` on array allocated memory (`new[]`) leads to undefined behavior. For class objects, scalar `delete` will invoke destructor only for the first array element and deallocate memory improperly, leading to resource leaks or crash.",
    followUp: "How does C++ runtime know how many destructors to call when `delete[]` is executed?",
    trap: "Mismatched use of `new` with `delete[]` or `new[]` with `delete`."
  },
  {
    id: "association-has-a",
    title: "20. Aggregation & Association (HAS-A Relationship)",
    importance: "IMPORTANT",
    category: "Conceptual",
    difficulty: "Medium",
    concept: "Aggregation / Association represents a HAS-A relationship where one class defines another class as an entity reference, providing alternative code reuse without inheritance coupling.",
    keyPoints: [
      "Represents HAS-A relationship (e.g., Car HAS-A Engine).",
      "One class contains a reference or pointer to another class entity.",
      "IS-A = Inheritance; HAS-A = Association / Aggregation.",
      "Provides weaker coupling and dynamic flexibility over inheritance."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

class Engine {
public:
    void start() { cout << "V8 Engine Started. "; }
};

class Car {
private:
    Engine engine; // HAS-A
public:
    void drive() {
        engine.start();
        cout << "Driving...";
    }
};

int main() { Car myCar; myCar.drive(); }`,
    output: "V8 Engine Started. Driving...",
    outputExplanation: "Car has an Engine entity member (HAS-A relationship), delegating start() action to Engine instance.",
    interviewQuestion: "Compare IS-A vs HAS-A relationships in OOP design. When should you favor HAS-A?",
    goodAnswer: "IS-A represents inheritance where a derived class is a specialized subtype of base class. HAS-A represents association/composition where a class contains an instance reference of another class. You should favor HAS-A (Composition over Inheritance) to reduce tight coupling and allow dynamic runtime component swapping.",
    followUp: "What is the difference between Aggregation and Composition?",
    trap: "Using inheritance when a HAS-A relationship is appropriate (e.g. making Car inherit from Engine)."
  },
  {
    id: "namespaces",
    title: "21. Namespaces in C++",
    importance: "IMPORTANT",
    category: "Definition",
    difficulty: "Easy",
    concept: "A Namespace is a logical division of code designed to stop naming conflicts and remove ambiguity when identifiers (variables, functions, classes) share identical names.",
    keyPoints: [
      "Defines a scope for identifiers to stop naming conflicts.",
      "Removes ambiguity when multiple libraries define identical function names (`add()`).",
      "C++ standard namespace `std` contains inbuilt classes and functions.",
      "Access identifiers using Scope Resolution operator (`NamespaceName::identifier`)."
    ],
    code: `#include <bits/stdc++.h>
using namespace std;

namespace Add {
    int a = 5, b = 5;
    int add() { return (a + b); }
}

int main() {
    int res = Add::add();
    cout << "Namespace Result: " << res;
}`,
    output: "Namespace Result: 10",
    outputExplanation: "Scope resolution operator `Add::add()` unambiguously resolves `add()` function declared inside `Add` namespace.",
    interviewQuestion: "Why are Namespaces used in C++ and how do they resolve ambiguity?",
    goodAnswer: "Namespaces group code identifiers into distinct scope domains, preventing naming collisions when using multiple third-party libraries that declare functions or classes with identical names. Identifiers are unambiguously resolved using scope resolution operator `Namespace::Name` or `using namespace` directives.",
    followUp: "Why is `using namespace std;` considered bad practice in large C++ header files?",
    trap: "Placing `using namespace std;` inside global header files (.h), polluting global namespace scope for consumers."
  }
];

export const QUICK_REVISION = [
  { term: "Class", summary: "User-defined data type blueprint describing properties & functions. Takes NO memory until instantiated." },
  { term: "Object", summary: "Runtime entity & instance of a class. Stack object (`S s;`), Heap object (`S* s = new S();`)." },
  { term: "Encapsulation", summary: "Combining data & functions into a class, keeping attributes private with getter/setter access." },
  { term: "Data Hiding", summary: "Language restriction (`private`, `protected`) protecting internal state from external dependencies." },
  { term: "Abstraction", summary: "Exposing essential interface view while hiding background implementation details." },
  { term: "Data Binding", summary: "Connecting application UI directly to underlying business logic data fields." },
  { term: "Inheritance", summary: "Child derived class acquires properties & behaviors of parent base class automatically." },
  { term: "5 Inheritance Types", summary: "Single (A->B), Multilevel (A->B->C), Hierarchical (A->B,C), Multiple (A,B->C), Hybrid." },
  { term: "Polymorphism", summary: "One interface representing differing underlying forms (Poly=many, Morphism=forms)." },
  { term: "Overloading", summary: "Compile-time static binding: same method name with different parameter signatures in same class." },
  { term: "Overriding", summary: "Runtime dynamic binding: child class redefines parent method with exact matching signature." },
  { term: "Virtual Function", summary: "Base member function declared `virtual`, enabling runtime dynamic dispatch via base pointer." },
  { term: "Pure Virtual Function", summary: "Declared `= 0` in base class with no base definition. Forces derived class override." },
  { term: "Abstract Class", summary: "Class containing at least 1 pure virtual function. CANNOT be instantiated directly." },
  { term: "Constructors", summary: "Default (no args), Parameterized (`g a(20)`), Copy (`g b(a)`). Initializes object data." },
  { term: "Destructor", summary: "Tilde prefix (`~A()`). Destructs objects automatically in reverse construction order (LIFO)." },
  { term: "this Pointer", summary: "Implicit pointer to current object instance. Resolves member vs parameter name collisions." },
  { term: "Friend Function", summary: "Non-member function declared `friend` inside class that can access private/protected data." },
  { term: "Access Specifiers", summary: "Private (class only), Protected (class & child), Public (anywhere in program)." },
  { term: "Virtual Inheritance", summary: "Prevents Diamond Problem ambiguity by creating single shared subobject copy of base class." },
  { term: "delete vs delete[]", summary: "`delete` releases single unit; `delete[]` releases heap array and calls element destructors." },
  { term: "HAS-A Association", summary: "Entity reference relationship (Car HAS-A Engine). Preferred over tight inheritance coupling." },
  { term: "Namespaces", summary: "Logical scope division stopping naming conflicts (`Add::add()`, `std`)." }
];

export const RAPID_FIRE = [
  { q: "What are the four pillars of OOP?", a: "Encapsulation, Abstraction, Inheritance, Polymorphism." },
  { q: "Function Overloading happens at?", a: "Compile time (Static Binding)." },
  { q: "Function Overriding happens at?", a: "Runtime (Dynamic Binding)." },
  { q: "Which keyword enables runtime polymorphism in C++?", a: "virtual" },
  { q: "Can a constructor be virtual in C++?", a: "No, constructors cannot be virtual." },
  { q: "Can a destructor be virtual in C++?", a: "Yes, destructors SHOULD be virtual when deleting derived objects via base pointers." },
  { q: "Can we instantiate an Abstract Class directly?", a: "No, abstract classes cannot be instantiated." },
  { q: "What is the syntax for a pure virtual function?", a: "virtual void display() = 0;" },
  { q: "Which operator releases heap arrays in C++?", a: "delete[]" },
  { q: "What relationship does Aggregation represent?", a: "HAS-A relationship (Entity reference)." },
  { q: "Default access specifier for C++ class vs struct?", a: "Class defaults to private; Struct defaults to public." },
  { q: "How many times can a destructor be defined in a class?", a: "Only once per class." }
];

export const QUESTION_BANK = [
  {
    id: "q1",
    question: "What is the difference between a class and an object?",
    difficulty: "Easy",
    category: "Difference",
    answer: "A class is a logical blueprint/data type describing properties and methods without occupying memory. An object is a runtime instance of a class that occupies memory on Stack or Heap.",
    followUp: "How does C++ allocate memory for `student s` vs `student* s = new student()`?"
  },
  {
    id: "q2",
    question: "Why is encapsulation useful in software engineering?",
    difficulty: "Medium",
    category: "Conceptual",
    answer: "Encapsulation protects object state by restricting direct member access via private specifiers. It ensures data validation through setters, reduces coupling, and allows internal class implementation changes without breaking client code.",
    followUp: "How does encapsulation differ from data hiding?"
  },
  {
    id: "q3",
    question: "What is the difference between Abstraction and Encapsulation?",
    difficulty: "Medium",
    category: "Difference",
    answer: "Abstraction focuses on WHAT an object does by exposing essential interfaces (abstract classes). Encapsulation focuses on HOW data is protected by bundling state and restricting member access (private variables + getters/setters).",
    followUp: "Can you achieve abstraction without encapsulation?"
  },
  {
    id: "q4",
    question: "Why do we need virtual functions in C++?",
    difficulty: "Hard",
    category: "Why/How",
    answer: "Virtual functions enable runtime dynamic dispatch. They allow a Base class pointer pointing to a Derived class object to invoke the Derived class's overridden function implementation instead of the Base class version.",
    followUp: "Explain how VPTR and V-TABLE work under the hood."
  },
  {
    id: "q5",
    question: "What happens when a derived object is accessed through a base class pointer?",
    difficulty: "Hard",
    category: "Scenario",
    answer: "If the function is non-virtual, static binding occurs and the Base class version executes. If the function is declared `virtual` in Base, dynamic binding resolves via VPTR lookup and the Derived class implementation executes.",
    followUp: "What happens if the base class destructor is NOT virtual in this scenario?"
  },
  {
    id: "q6",
    question: "Why can't we instantiate an abstract class?",
    difficulty: "Hard",
    category: "Conceptual",
    answer: "Abstract classes contain pure virtual functions (`= 0`) with no base implementation. Instantiating an abstract class directly could lead to calling un-implemented pure virtual functions, breaking runtime safety.",
    followUp: "Can an abstract class have data members and non-virtual methods?"
  },
  {
    id: "q7",
    question: "What is the difference between function overloading and function overriding?",
    difficulty: "Medium",
    category: "Difference",
    answer: "Overloading occurs in the same class scope with same function name but different parameter signatures at compile-time. Overriding occurs across Base and Derived classes with exact matching signature and `virtual` keyword at runtime.",
    followUp: "Can overloaded functions differ only by return type?"
  },
  {
    id: "q8",
    question: "What will this program print?\nBase* b = new Derived(); b->show(); // where Base::show() is non-virtual",
    difficulty: "Code-based",
    category: "Output",
    answer: "It will print the Base class implementation of `show()`, because without the `virtual` keyword in Base, C++ performs static binding at compile time based on pointer type (`Base*`).",
    followUp: "How do you fix this to execute Derived::show()?"
  },
  {
    id: "q9",
    question: "When would you prefer inheritance (IS-A) vs composition (HAS-A)?",
    difficulty: "Hard",
    category: "Scenario",
    answer: "Prefer inheritance (IS-A) when there is a true polymorphic subtype relationship where derived class replaces base. Prefer composition (HAS-A) when reusing functionality without rigid class coupling, enabling dynamic runtime changes.",
    followUp: "What is the principle of 'Composition over Inheritance'?"
  },
  {
    id: "q10",
    question: "What is the role of a copy constructor and why must its parameter be a reference?",
    difficulty: "Medium",
    category: "Why/How",
    answer: "A copy constructor creates an object by copying an existing instance of the same class. The parameter MUST be a reference (`const Class &obj`) because passing by value requires creating a copy, causing infinite recursive copy constructor calls.",
    followUp: "What is the difference between shallow copy and deep copy?"
  }
];
