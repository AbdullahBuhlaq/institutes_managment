const permission = {
  //User
  المستخدم: {
    الكل: "user.all",
    مخصص: "user.interests",
  },

  //Account
  الحساب: {
    تحديث: "account.update",
    حذف: "account.delete",
    إلغاء: "account.disable",
    "تغيير كلمة المرور": "account.changePassword",
    "تغيير رقم الموبايل": "account.changePhone",
    "تغيير البريد": "account.changeEmail",
    //image account
    "رفع الصور": "account.uploadImage",
    "حذف الصور": "account.deleteImage",
    "طلب الصور": "account.getImage",
  },

  //Role
  الدور: {
    إنشاء: "role.create",
    تحديث: "role.update",
    حذف: "role.delete",
    الكل: "role.all",
  },

  الفرع: {
    إنشاء: "branch.create",
    تحديث: "branch.update",
    الكل: "branch.all",
  },

  الموظف: {
    إضافة: "employee.add",
    "الإضافة في فرعه": "employee.addInMyBranch",
    تحديث: "employee.update",
    "التحديث في فرعه": "employee.updateInMyBranch",
    حذف: "employee.delete",
    "الحذف في فرعه": "employee.deleteInMyBranch",
    الكل: "employee.all",
    "الكل في فرعه": "employee.allInMyBranch",
  },
};

export const adminPermission = {
  الموظفين: {
    "إضافة موظفين": "admin.employee.add",
    "تعديل معلومات الموظفين": "admin.employee.update",
    "حذف الموظفين": "admin.employee.delete",
    "إعطاء كل الصلاحيات داخل قسم الموظفين": "admin.employee.all",
  },
  الأدوار: {
    "إضافة أدوار": "admin.role.add",
    "تعديل معلومات الدور": "admin.role.update",
    "حذف معلومات الدور": "admin.role.delete",
    "إعطاء كل الصلاحيات داخل قسم الأدوار": "admin.role.all",
  },
  المراكز: {
    "إضافة مراكز": "admin.training_center.add",
    "إعطاء كل الصلاحيات داخل قسم المراكز": "admin.training_center.all",
  },
  "إرسال بريد إلكتروني": {
    "يتمكن من إرسال بريد إلكتروني": "admin.mail.send",
  },
};

export const trainingPermission = {
  // folder student
  الطلاب: {
    "يتمكن من إضافة طلاب إلى المركز": "admin_training.students.controller.add",
    "إعطاء صلاحية لتعديل معلومات طلاب المركز": "admin_training.students.controller.update",
    "إعطاء صلاحية لحذف طلاب المركز": "admin_training.students.controller.delete",
    "كل الصلاحيات داخل قسم الطلاب": "admin_training.students.controller.all",
    "يتمكن من إضافة الطلاب داخل فرعه فقط": "admin_training.students.controller.addInBranch",
    "تحديث معلومات الطلاب داخل فرعه فقط": "admin_training.students.controller.updateInBranch",
    "حذف الطلاب داخل فرعه فقط": "admin_training.students.controller.deleteInBranch",
    "كل الصلاحيات داخل قسم الطلاب في فرعه فقط": "admin_training.students.controller.allInBranch",
  },
  "أقساط الطلاب": {
    add: "admin_training.students.student_receipts.add",
    update: "admin_training.students.student_receipts.update",
    delete: "admin_training.students.student_receipts.delete",
    all: "admin_training.students.student_receipts.all",
  },
  // folder teacher
  المعلمون: {
    add: "admin_training.teachers.controller.add",
    update: "admin_training.teachers.controller.update",
    delete: "admin_training.teachers.controller.delete",
    all: "admin_training.teachers.controller.all",
    addInBranch: "admin_training.teachers.controller.addInBranch",
    updateInBranch: "admin_training.teachers.controller.updateInBranch",
    deleteInBranch: "admin_training.teachers.controller.deleteInBranch",
    allINBranch: "admin_training.teachers.controller.allInBranch",
  },
  "أجور المعلمين": {
    add: "admin_training.teachers.teachers_receipts.add",
    update: "admin_training.teachers.teachers_receipts.update",
    delete: "admin_training.teachers.teachers_receipts.delete",
    all: "admin_training.teachers.teachers_receipts.all",
  },
  // أقسام: {
  //   add: "admin_training.category.add",
  //   update: "admin_training.category.update",
  //   delete: "admin_training.category.delete",
  //   all: "admin_training.category.all",
  //   addInBranch: "admin_training.category.addInBranch",
  //   updateInBranch: "admin_training.category.updateInBranch",
  //   deleteInBranch: "admin_training.category.deleteInBranch",
  //   allINBranch: "admin_training.category.allInBranch",
  // },
  قاعات: {
    add: "admin_training.room.add",
    update: "admin_training.room.update",
    delete: "admin_training.room.delete",
    all: "admin_training.room.all",
    addInBranch: "admin_training.room.addInBranch",
    updateInBranch: "admin_training.room.updateInBranch",
    deleteInBranch: "admin_training.room.deleteInBranch",
    allINBranch: "admin_training.room.allInBranch",
  },
  أفرع: {
    add: "admin_training.branches.add",
    update: "admin_training.branches.update",
    delete: "admin_training.branches.delete",
    all: "admin_training.branches.all",
  },
  دورات: {
    add: "admin_training.course.add",
    update: "admin_training.course.update",
    delete: "admin_training.course.delete",
    all: "admin_training.course.all",
    changeState: "admin_training.course.changeState",
    getInformation: "admin_training.course.form.getInformation",
    stop: "admin_training.course.form.stop",
    generate: "admin_training.course.form.generate",
    join: "admin_training.courses.enroll.join",
    disjoin: "admin_training.courses.enroll.disjoin",
  },
  حسومات: {
    add: "admin_training.discount.add",
    update: "admin_training.discount.update",
    delete: "admin_training.discount.delete",
    all: "admin_training.discount.all",
    addInBranch: "admin_training.discount.addInBranch",
    updateInBranch: "admin_training.discount.updateInBranch",
    deleteInBranch: "admin_training.discount.deleteInBranch",
    allINBranch: "admin_training.discount.allInBranch",
  },
  موظفين: {
    add: "admin_training.employee.add",
    update: "admin_training.employee.update",
    delete: "admin_training.employee.delete",
    all: "admin_training.employee.all",
    addInBranch: "admin_training.employee.addInBranch",
    updateInBranch: "admin_training.employee.updateInBranch",
    deleteInBranch: "admin_training.employee.deleteInBranch",
    allINBranch: "admin_training.employee.allInBranch",
  },
  // أرباح: {
  //   add: "admin_training.fees.add",
  //   update: "admin_training.fees.update",
  //   delete: "admin_training.fees.delete",
  //   all: "admin_training.fees.all",
  //   addInBranch: "admin_training.fees.addInBranch",
  //   updateInBranch: "admin_training.fees.updateInBranch",
  //   deleteInBranch: "admin_training.fees.deleteInBranch",
  //   allINBranch: "admin_training.fees.allInBranch",
  // },
  "المركز الأساسي": {
    update: "admin_training.my_training.update",
    delete: "admin_training.my_training.delete",
    getInfo: "admin_training.my_training.getInfo",
  },
  الدفاتر: {
    add: "admin_training.notebook.add",
    update: "admin_training.notebook.update",
    delete: "admin_training.notebook.delete",
    all: "admin_training.notebook.all",
    addInBranch: "admin_training.notebook.addInBranch",
    updateInBranch: "admin_training.notebook.updateInBranch",
    deleteInBranch: "admin_training.notebook.deleteInBranch",
    allINBranch: "admin_training.notebook.allInBranch",
  },
  الأدوار: {
    add: "admin_training.role.add",
    update: "admin_training.role.update",
    delete: "admin_training.role.delete",
    all: "admin_training.role.all",
  },
  المواد: {
    add: "admin_training.subject.add",
    update: "admin_training.subject.update",
    delete: "admin_training.subject.delete",
    all: "admin_training.subject.all",
  },
};
// module.exports.permissions = {
//   admin: {
//     employee: {
//       add: "admin.employee.add",
//       update: "admin.employee.update",
//       delete: "admin.employee.delete",
//       all: "admin.employee.all",
//     },
//     role: {
//       add: "admin.role.add",
//       update: "admin.role.update",
//       delete: "admin.role.delete",
//       all: "admin.role.all",
//     },
//     training_center: {
//       add: "admin.training_center.add",
//       all: "admin.training_center.all",
//     },
//     mail: {
//       send: "admin.mail.send",
//     },
//   },
//   admin_training: {
//     // folder student
//     students: {
//       controller: {
//         add: "admin_training.students.controller.add",
//         update: "admin_training.students.controller.update",
//         delete: "admin_training.students.controller.delete",
//         all: "admin_training.students.controller.all",
//         addInBranch: "admin_training.students.controller.addInBranch",
//         updateInBranch: "admin_training.students.controller.updateInBranch",
//         deleteInBranch: "admin_training.students.controller.deleteInBranch",
//         allINBranch: "admin_training.students.controller.allInBranch",
//       },
//       student_receipts: {
//         add: "admin_training.students.student_receipts.add",
//         update: "admin_training.students.student_receipts.update",
//         delete: "admin_training.students.student_receipts.delete",
//         all: "admin_training.students.student_receipts.all",
//       },
//     },
//     // folder teacher
//     teachers: {
//       controller: {
//         add: "admin_training.teachers.controller.add",
//         update: "admin_training.teachers.controller.update",
//         delete: "admin_training.teachers.controller.delete",
//         all: "admin_training.teachers.controller.all",
//         addInBranch: "admin_training.teachers.controller.addInBranch",
//         updateInBranch: "admin_training.teachers.controller.updateInBranch",
//         deleteInBranch: "admin_training.teachers.controller.deleteInBranch",
//         allINBranch: "admin_training.teachers.controller.allInBranch",
//       },
//       teachers_receipts: {
//         add: "admin_training.teachers.teachers_receipts.add",
//         update: "admin_training.teachers.teachers_receipts.update",
//         delete: "admin_training.teachers.teachers_receipts.delete",
//         all: "admin_training.teachers.teachers_receipts.all",
//       },
//     },
//     category: {
//       add: "admin_training.category.add",
//       update: "admin_training.category.update",
//       delete: "admin_training.category.delete",
//       all: "admin_training.category.all",
//       addInBranch: "admin_training.category.addInBranch",
//       updateInBranch: "admin_training.category.updateInBranch",
//       deleteInBranch: "admin_training.category.deleteInBranch",
//       allINBranch: "admin_training.category.allInBranch",
//     },
//     room: {
//       add: "admin_training.room.add",
//       update: "admin_training.room.update",
//       delete: "admin_training.room.delete",
//       all: "admin_training.room.all",
//       addInBranch: "admin_training.room.addInBranch",
//       updateInBranch: "admin_training.room.updateInBranch",
//       deleteInBranch: "admin_training.room.deleteInBranch",
//       allINBranch: "admin_training.room.allInBranch",
//     },
//     branches: {
//       add: "admin_training.branches.add",
//       update: "admin_training.branches.update",
//       delete: "admin_training.branches.delete",
//       all: "admin_training.branches.all",
//     },
//     course: {
//       add: "admin_training.course.add",
//       update: "admin_training.course.update",
//       delete: "admin_training.course.delete",
//       all: "admin_training.course.all",
//       changeState: "admin_training.course.changeState",
//       form: {
//         getInformation: "admin_training.course.form.getInformation",
//         stop: "admin_training.course.form.stop",
//         generate: "admin_training.course.form.generate",
//       },
//       enroll: {
//         join: "admin_training.courses.enroll.join",
//         disjoin: "admin_training.courses.enroll.disjoin",
//       },
//     },
//     discount: {
//       add: "admin_training.discount.add",
//       update: "admin_training.discount.update",
//       delete: "admin_training.discount.delete",
//       all: "admin_training.discount.all",
//       addInBranch: "admin_training.discount.addInBranch",
//       updateInBranch: "admin_training.discount.updateInBranch",
//       deleteInBranch: "admin_training.discount.deleteInBranch",
//       allINBranch: "admin_training.discount.allInBranch",
//     },
//     employee: {
//       add: "admin_training.employee.add",
//       update: "admin_training.employee.update",
//       delete: "admin_training.employee.delete",
//       all: "admin_training.employee.all",
//       addInBranch: "admin_training.employee.addInBranch",
//       updateInBranch: "admin_training.employee.updateInBranch",
//       deleteInBranch: "admin_training.employee.deleteInBranch",
//       allINBranch: "admin_training.employee.allInBranch",
//     },
//     fees: {
//       add: "admin_training.fees.add",
//       update: "admin_training.fees.update",
//       delete: "admin_training.fees.delete",
//       all: "admin_training.fees.all",
//       addInBranch: "admin_training.fees.addInBranch",
//       updateInBranch: "admin_training.fees.updateInBranch",
//       deleteInBranch: "admin_training.fees.deleteInBranch",
//       allINBranch: "admin_training.fees.allInBranch",
//     },
//     my_training: {
//       update: "admin_training.my_training.update",
//       delete: "admin_training.my_training.delete",
//       getInfo: "admin_training.my_training.getInfo",
//     },
//     notebook: {
//       add: "admin_training.notebook.add",
//       update: "admin_training.notebook.update",
//       delete: "admin_training.notebook.delete",
//       all: "admin_training.notebook.all",
//       addInBranch: "admin_training.notebook.addInBranch",
//       updateInBranch: "admin_training.notebook.updateInBranch",
//       deleteInBranch: "admin_training.notebook.deleteInBranch",
//       allINBranch: "admin_training.notebook.allInBranch",
//     },
//     role: {
//       add: "admin_training.role.add",
//       update: "admin_training.role.update",
//       delete: "admin_training.role.delete",
//       all: "admin_training.role.all",
//     },
//     subject: {
//       add: "admin_training.subject.add",
//       update: "admin_training.subject.update",
//       delete: "admin_training.subject.delete",
//       all: "admin_training.subject.all",
//     },
//   },
//   account: {
//     changePassword: "account.changePassword",
//     editEmail: "account.editEmail",
//     getProfile: "account.getProfile",
//   },
//   device: {
//     all: "device.all",
//     delete: "device.delete",
//   },
// };

export default permission;
