import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default async function ConfirmDeleteModal({
  whatIsDeleted,
  handleDelete,
}) {
  const result = await MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    handleDelete();
    Swal.fire({
      title: "Deleted!",
      text: `${whatIsDeleted} has been deleted.`,
      icon: "success",
    });
  }
}
