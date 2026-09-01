---
title: "后端学习：Java 继承相关笔记梳理"
link: java-inheritance-guide
catalog: true
date: 2026-08-30 00:00:00
description: "从代码复用出发，系统梳理 Java 继承的语法、重写规则、构造顺序、访问权限、Object、类型转换，以及实际开发中的使用边界。"
tags:
  - Java
  - 面向对象
  - 继承
categories:
  - 后端笔记
keywords:
  - Java 继承
  - extends
  - super
  - 方法重写
  - 多态
---

Java 面向对象的三个重要特征是封装、继承和多态。封装解决“对象内部怎么管理”，继承解决“相似的类如何复用”，多态解决“同一调用如何表现出不同的行为”。这篇文章只聚焦继承，并把它和重写、构造方法、类型转换之间的关系串起来。

## Java 学习路径图

继承属于 Java 基础语法和面向对象编程的一部分。可以先沿着下面的路径建立整体知识框架，再把继承和接口、集合、异常、并发等主题串起来学习。

![Java 程序员进阶之路](/img/posts/java-inheritance-guide/java-learning-roadmap.png)

## 一、先用一句话理解继承

继承表示一种 **is-a（是一个）** 的关系：子类是一种更具体的父类。子类可以复用父类允许继承的成员，也可以增加自己的成员，或者重写父类中允许重写的方法。

例如，狗和猫都是动物。Animal 可以放置所有动物共有的状态和行为，Dog、Cat 只需要补充各自的差异：

~~~java
class Animal {
    private final String name;

    public Animal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void eat() {
        System.out.println(name + " 正在进食");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    public void bark() {
        System.out.println(getName() + " 正在汪汪叫");
    }
}
~~~

Dog extends Animal 表示 Dog 是 Animal 的子类，Animal 是 Dog 的直接父类。创建 Dog 对象后，可以直接调用继承来的 eat()，也可以调用 Dog 自己的 bark()。

## 二、为什么需要继承

没有继承时，Dog、Cat 可能都要重复声明名字、年龄和 eat() 等成员。重复代码不仅增加工作量，也容易出现一处修改、另一处遗漏的问题。

继承可以把稳定的公共部分放到父类中：

1. 子类复用父类的公共属性和方法。
2. 子类只关注自己的差异，减少重复代码。
3. 父类引用可以指向不同子类对象，为多态提供基础。

但继承不是“代码复用工具箱”。只有当两个类型确实存在稳定的 is-a 关系时才适合继承。如果只是想复用几段实现，组合（在一个类中持有另一个类）通常更灵活。

## 三、extends 的基本语法

~~~java
class 子类 extends 父类 {
    // 子类新增或重写的成员
}
~~~

Java 的类只支持 **单继承**：一个类最多只有一个直接父类。下面的写法不合法：

~~~java
// Java 不支持这种类的多继承
// class Child extends ParentA, ParentB { }
~~~

类可以形成继承链，例如 Puppy extends Dog，而 Dog extends Animal。Puppy 会间接拥有 Animal 中可继承的成员。继承层次不宜过深，否则修改顶层父类可能影响许多子类。

Java 用接口补足多种能力的组合：一个类可以实现多个接口。

~~~java
interface Swimmable {
    void swim();
}

interface RunnableAnimal {
    void run();
}

class Duck extends Animal implements Swimmable, RunnableAnimal {
    public Duck(String name) {
        super(name);
    }

    @Override
    public void swim() {
        System.out.println("鸭子在游泳");
    }

    @Override
    public void run() {
        System.out.println("鸭子在奔跑");
    }
}
~~~

extends 用于继承一个类，implements 用于实现一个或多个接口。接口更像能力契约，父类更适合表达共享状态和共享实现。

## 四、子类到底继承什么

“子类拥有父类的一切”是一个容易误解的说法。更准确的理解如下：

| 父类成员 | 子类能否直接使用 | 说明 |
| --- | --- | --- |
| public | 可以 | 只要访问位置满足类本身的访问规则 |
| protected | 可以 | 同包可访问；不同包的子类也可通过继承关系使用 |
| 默认（无修饰符） | 视情况而定 | 只有同一个包中的子类可以直接访问 |
| private | 不可以 | 成员仍属于父类对象，只能通过父类提供的方法间接使用 |
| 构造方法 | 不继承 | 创建子类对象时会调用父类构造方法 |

父类的 private 方法不能被子类重写。子类写一个同名方法，只是定义了一个新方法，不会产生重写关系。

## 五、方法重写：继承中的核心动作

子类用相同的方法名、参数列表和兼容的返回类型，重新提供实现，叫作 **重写（Override）**：

~~~java
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("猫在喵喵叫");
    }
}
~~~

建议始终写 @Override。它能让编译器检查方法是否真的重写了父类方法，参数写错或父类方法不存在时可以及时发现问题。

重写需要遵守几条规则：

- 方法名和参数列表必须一致。
- 返回类型可以相同，也可以是父类返回类型的子类型（协变返回类型）。
- 子类方法的访问权限不能比父类更严格。例如父类是 protected，子类只能保持 protected 或扩大为 public。
- 子类不能重写父类的 private、static 和 final 方法。static 方法属于类，子类同名时是隐藏；final 方法明确禁止重写。
- 重写方法不能抛出比父类更宽的受检异常；可以不抛异常，或抛出父类异常的子类型。

重写和重载不要混淆：重载是方法名相同但参数列表不同；重写要求参数列表相同，体现的是父子类对同一个行为的重新实现。

## 六、this 和 super 怎么区分

this 指向当前对象，super 表示父类部分的引用。它们常见的用法是：

~~~java
class Student extends Person {
    private final String school;

    public Student(String name, String school) {
        super(name);          // 调用父类构造方法
        this.school = school; // 当前对象的成员变量
    }

    @Override
    public void introduce() {
        super.introduce();    // 调用父类版本
        System.out.println("学校：" + this.school);
    }
}
~~~

- this.field：当前类的成员变量。
- this.method()：当前对象的方法。
- this(...)：调用本类的另一个构造方法，必须放在构造方法第一行。
- super.field：父类中可访问的成员变量。
- super.method()：调用父类版本的方法。
- super(...)：调用父类构造方法，必须放在子类构造方法第一行。

如果子类构造方法没有显式写 super(...)，编译器会尝试插入 super()。只要父类声明了带参数构造方法、没有无参构造方法，子类就必须显式调用其中一个父类构造方法。

父类构造方法不能被继承，但构造子类对象时必须先完成父类部分的初始化，再初始化子类部分。

## 七、继承中的构造与初始化顺序

首次加载并创建子类对象时，通常可以按下面的顺序理解：

1. 父类静态变量和静态代码块。
2. 子类静态变量和静态代码块。
3. 父类实例变量和实例代码块。
4. 父类构造方法。
5. 子类实例变量和实例代码块。
6. 子类构造方法。

可以记成：**先静态、后实例；先父类、后子类；先初始化成员、后执行构造方法**。同一类中的字段初始化和代码块按照出现顺序执行。

~~~java
class Parent {
    static { System.out.println("父类静态代码块"); }
    { System.out.println("父类实例代码块"); }

    Parent() {
        System.out.println("父类构造方法");
    }
}

class Child extends Parent {
    static { System.out.println("子类静态代码块"); }
    { System.out.println("子类实例代码块"); }

    Child() {
        System.out.println("子类构造方法");
    }
}
~~~

执行 new Child() 时，输出顺序就是父类静态、子类静态、父类实例、父类构造、子类实例、子类构造。实际项目中不建议大量依赖初始化代码块，显式构造方法通常更容易阅读。

## 八、Object：所有类的根父类

如果一个类没有显式写 extends，它默认继承 java.lang.Object。因此，所有 Java 对象都可以使用 Object 中的方法，常见的包括：

- toString()：对象的字符串表示，业务类通常会重写它。
- equals(Object)：逻辑相等判断。重写时通常也要一起重写 hashCode()。
- hashCode()：哈希值，影响哈希集合中的查找和去重。
- getClass()：获取运行时类型。
- wait()、notify()、notifyAll()：线程协作相关方法。

Object 是类型体系的顶端，所以任何对象都可以赋值给 Object 引用：

~~~java
Object value = new Dog("旺财");
System.out.println(value.toString());
~~~

## 九、向上转型与向下转型

### 1. 向上转型

把子类对象赋给父类引用，属于自动转换：

~~~java
Animal animal = new Dog("旺财");
animal.eat();
~~~

引用的静态类型是 Animal，所以编译器只允许调用 Animal 中声明的方法。但如果该方法被 Dog 重写，运行时会执行 Dog 的版本，这就是动态方法分派，也是多态的基础。

~~~java
class Animal {
    public void makeSound() {
        System.out.println("动物声音");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪");
    }
}

Animal animal = new Dog();
animal.makeSound(); // 输出：汪汪
~~~

### 2. 向下转型

向下转型把父类引用还原为子类引用，需要显式强制转换：

~~~java
Animal animal = new Dog("旺财");
Dog dog = (Dog) animal;
dog.bark();
~~~

前提是引用实际指向的对象确实是目标子类，否则运行时会抛出 ClassCastException。转换前应使用 instanceof 检查：

~~~java
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.bark();
}
~~~

下面的代码虽然可能通过编译，但运行时一定失败，因为 animal 实际指向的是 Dog，而不是 Cat：

~~~java
// Cat cat = (Cat) animal; // ClassCastException
~~~

如果频繁向下转型，通常说明父类抽象得不够好，或者调用方依赖了过多的子类细节，应重新审视设计。

## 十、抽象类、final 与继承边界

### 抽象类

抽象类用于表达一类对象的共同概念，不能直接 new。它可以同时拥有普通方法、字段、构造方法和抽象方法：

~~~java
abstract class Payment {
    public abstract void pay(double amount);

    public void printReceipt() {
        System.out.println("打印收据");
    }
}

class AlipayPayment extends Payment {
    @Override
    public void pay(double amount) {
        System.out.println("支付宝支付：" + amount);
    }
}
~~~

继承抽象类的具体子类必须实现所有抽象方法，否则子类也必须声明为抽象类。

### final

final 表示“不能再改变”：

- final 变量只能赋值一次。
- final 方法可以被继承，但不能被重写。
- final 类不能被继承，例如 String。

当一个类的行为不希望被扩展，或扩展会破坏安全性和不变式时，可以考虑使用 final。

## 十一、几个容易踩坑的点

### 静态方法不是多态重写

静态方法由引用的编译时类型决定，属于方法隐藏，不会像实例方法那样动态分派：

~~~java
class Parent {
    static void show() { System.out.println("parent"); }
}

class Child extends Parent {
    static void show() { System.out.println("child"); }
}

Parent value = new Child();
value.show(); // 输出 parent
~~~

### 字段也不会发生动态重写

字段使用哪个版本，主要由引用的静态类型决定。需要多态行为时，应使用实例方法，而不是依赖同名字段。

### 不要在父类构造方法中调用可重写方法

子类字段还没有完成初始化，父类构造方法如果调用可重写方法，可能提前执行子类逻辑，导致读取到默认值或产生难以发现的错误。

### 继承层次不要为了省几行代码而无限加深

父类一旦被大量子类依赖，修改它会产生较大影响。优先保持父类职责清晰，必要时使用接口和组合拆分变化。

## 十二、把继承串成一条主线

可以用下面这条路径复习 Java 继承：

> extends 建立父子关系 → 子类复用可访问成员 → @Override 改变实例方法行为 → super 访问父类实现 → 构造时先初始化父类 → 向上转型承载多态 → Object 提供统一根类型。

真正使用继承时，重点不是记住“子类能拿到哪些代码”，而是判断这段关系是否合理：

1. 子类是否确实是父类的一种？
2. 父类方法的契约，子类是否能够继续满足？
3. 变化来自类型差异，还是仅仅来自实现复用？
4. 是否应该用接口表达能力，用组合替代继承？

## 结语

Java 继承的表面语法只有 extends，但真正重要的是一组相互配合的规则：单继承限制了类层次的复杂度，接口提供了能力组合，重写带来运行时多态，super 和构造链保证父子对象正确初始化，Object 则把所有对象放进同一套类型体系。

把这些规则和访问权限、异常、static、final、类型转换放在一起理解，继承就不再只是“子类复用父类代码”，而是一种需要谨慎设计的类型关系。

> 参考阅读：[深入理解 Java 继承](https://javabetter.cn/oo/extends-bigsai.html)。本文为基于该主题的原创整理，示例代码和表述已重新组织。
