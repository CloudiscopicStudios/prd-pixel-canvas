import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "@/lib/mock-data";
import { ArrowLeft, Check, X, Download, Edit } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const handleEditOrder = async () => {
    setLoadingEdit(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoadingEdit(false);
    toast({
      title: "Edit Mode",
      description: "Order editing interface loaded",
    });
  };

  const handleRejectOrder = async () => {
    setLoadingReject(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingReject(false);
    toast({
      title: "Order Rejected",
      description: `Order #${id} has been rejected`,
    });
    navigate('/orders');
  };

  const handleApproveOrder = async () => {
    setLoadingApprove(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoadingApprove(false);
    toast({
      title: "Order Approved",
      description: `Order #${id} has been approved and sent to supplier`,
    });
    navigate('/orders');
  };

  const handleDownloadPdf = async () => {
    setLoadingDownload(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoadingDownload(false);
    toast({
      title: "PDF Downloaded",
      description: `Invoice for order #${id} has been downloaded`,
    });
  };

  const order = mockOrders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Order Not Found</h2>
          <Button onClick={() => navigate("/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending Approval":
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Pending Approval</Badge>;
      case "Delivered":
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Delivered</Badge>;
      case "Sent":
        return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Sent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const subtotal = order.items?.reduce((sum, item) => sum + item.total, 0) || order.total * 0.94;
  const tax = order.total - subtotal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/orders")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Order #{order.id}</h1>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-muted-foreground">Detailed order information and items</p>
        </div>
        {order.status === "Pending Approval" && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEditOrder} disabled={loadingEdit}>
              <Edit className="mr-2 h-4 w-4" />
              {loadingEdit ? "Loading..." : "Edit Order"}
            </Button>
            <Button variant="outline" onClick={handleRejectOrder} disabled={loadingReject}>
              <X className="mr-2 h-4 w-4" />
              {loadingReject ? "Rejecting..." : "Reject"}
            </Button>
            <Button onClick={handleApproveOrder} disabled={loadingApprove}>
              <Check className="mr-2 h-4 w-4" />
              {loadingApprove ? "Approving..." : "Approve & Send"}
            </Button>
          </div>
        )}
        {order.status === "Delivered" && (
          <Button variant="outline" onClick={handleDownloadPdf} disabled={loadingDownload}>
            <Download className="mr-2 h-4 w-4" />
            {loadingDownload ? "Downloading..." : "Download PDF"}
          </Button>
        )}
      </div>

      {/* Order Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Supplier</span>
              <span className="font-medium">{order.supplier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">{order.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="font-medium">{order.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Delivery</span>
              <span className="font-medium">{order.expectedDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created By</span>
              <span className="font-medium">{order.createdBy}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Items</span>
              <span className="font-medium">{order.itemCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (6.5%)</span>
              <span className="font-medium">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">${order.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Prediction Notes */}
      {order.notes && (
        <Card className="shadow-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">AI Prediction Notes</CardTitle>
            <CardDescription>Intelligence behind this order</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {order.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      {order.items && (
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Order Items ({order.itemCount})</CardTitle>
            <CardDescription>Detailed breakdown of all items in this order</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                  <TableHead className="text-right">Price/Unit</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">{item.qty}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{item.unit}</TableCell>
                    <TableCell className="text-right">${item.pricePerUnit.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-semibold">Subtotal</TableCell>
                  <TableCell className="text-right font-semibold">${subtotal.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">Tax (6.5%)</TableCell>
                  <TableCell className="text-right">${tax.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right text-lg font-bold">Total</TableCell>
                  <TableCell className="text-right text-lg font-bold">${order.total.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OrderDetail;
