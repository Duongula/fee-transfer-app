

function TransferItem({ transfer, user }) {
    console.log("con", transfer)
    console.log("user", user)

    const name = transfer.receiverId.name;
    const username = user.name;
    const senderName = transfer.senderId.name;

    return (
        <div>
            <h2>
                {senderName === username ? `To: ${name}` : `From: ${senderName}`} - {`$ ${transfer.amount}`}
            </h2>
        </div>
    )
}

export default TransferItem