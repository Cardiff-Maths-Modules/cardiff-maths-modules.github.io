Cardiff Maths Module Choosing Tool
==================================

This is a tool to help students make their module choices.


It is populated by two data sets:
+ [`_data/modules.yml`](https://github.com/Cardiff-Maths-Modules/cardiff-maths-modules.github.io/blob/master/_data/modules.yml)
+ [`_data/degrees.yml`](https://github.com/Cardiff-Maths-Modules/cardiff-maths-modules.github.io/blob/master/_data/degrees.yml)


Module Data
-----------

Module data is stored in `_data/modules/yml`. It lists modules. A module takes the following form:

```
- code: "MA2301"
  year: 2
  title: "Vector Calculus"
  credits: 10
  semester: 'Spring'

```

Modules _must_ contain the `code`, `year`, `title`, `credits` and `semester` fields. The `semester` field can be set to `'Autumn'`, `'Spring'` or `'Both'`. The `code` field _must_ be unique.

Extra information can be given to the modules:

+ **Prerequisites:** To add prerequisites, that is modules that must be selected before this module can be selected, list the module codes in the following way:
  

  ```
  - code: "MA3804"
    year: 3
    title: "Trading, Market Design and Applications"
    credits: 10
    semester: 'Spring'
    prerequisites:
      - "MA3801"
      - "MA3503"
  ```

+ **Clashes:** Modules might clash on the timetable, or may not be able to be taken together. To add clashes, that is modules that cannot be taken at the same time as this, list them in the following way:

  ```
  - code: "MA2760"
    year: 2
    title: "Mathematical Investigations with Python"
    credits: 10
    semester: 'Spring'
    clashes:
      - "MA2900"
  ```

+ **Welsh provision:** Some modules have Welsh or bilingual versions. These will have a different module code, title, and number of credits that count as Welsh provision. To add these, list them in the following way:

  ```
  - code: "MA1005"
    year: 1
    title: "Foundations of Mathematics I"
    credits: 20
    semester: "Autumn"
    welsh-code: "MA1055"
    welsh-title: "Seiliau Mathemateg I"
    welsh-credits: 10
  ```

These optional fields can all be combined, so a module can have prerequisites, clashes, and Welsh provision.


Degree Data
-----------

Degree data is stored in `_data/degree/yml`. It lists degree schemes. A degree takes the following form:

```
G100:
  years: "1-2-3"
  title: "BSc Mathematics"
  core-modules:
    - "MA1001"
    - "MA1003"
    - "MA1500"
    - "MA2001"
  optional-modules:
    - "MA1501"
    - "MA1801"
    - "MA2011"
    - "MA2014"
    - "MA2301"
    - "MA3005"
    - "MA3007"
    - "MA3008"
    - "MA3011"
    - "MA3012"
```

The first line is the degree scheme's UCAS code. It then has four mandatory fields: `years`, `title`, `core-modules` and `optional-modules`. The last two list the core and optional modules respectively, only these modules will be displayed on the selector screen. The field `years` is a string, with the years, in order, separated by a `-`. This allows for non-numerical years to be entered, such as years abroad or placement years.

